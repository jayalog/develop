import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

// import { Payment } from '../shared/profile.interface';

@Component({
  selector: 'fury-payment-popup',
  templateUrl: './paymentPopup.component.html',
  styleUrls: ['./paymentPopup.component.scss']
})
export class PaymentPopupComponent implements OnInit {

  isEdit: boolean;
  form: FormGroup;
  payment: any = [];
  items: any;
  country: Object[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PaymentPopupComponent>, private fb: FormBuilder) {
    console.log(data);
    this.isEdit = this.data.isEdit;
    this.payment = this.data.payment || null;
  }

  ngOnInit() {
    if (this.payment) {
      this.country = this.payment.filter((a) => a.key && a.key.toLowerCase() === "country");
      this.payment = this.payment.filter((a) => a.key && a.key.toLowerCase() !== "country");
      console.log(this.payment);
    }

    this.form = this.fb.group({
      location: [this.country && this.country.length > 0 && this.country[0]['value'] || 'india']
    });

    if (this.country && this.country.length > 0 && this.country[0]['value'] === 'india') {
      this.addItemsIndia();
    } else if (this.country && this.country.length > 0 && this.country[0]['value'] === 'others') {
      this.addItemsOthers();
    } else {
      this.addNullItemsIndia();
    }

    this.form.get('location').valueChanges.subscribe(val => {
      console.log('val', val);
      if (val === 'india') {
        this.form.removeControl('items');
        this.country && this.country.length > 0 && this.country[0]['value'] === 'india' ? this.addItemsIndia() : this.addNullItemsIndia();
      } else {
        this.form.removeControl('pannumber');
        this.form.removeControl('branch');
        this.form.removeControl('bankname');
        this.form.removeControl('accountnumber');
        this.form.removeControl('ifsccode');
        this.form.removeControl('name');

        this.country && this.country.length > 0 && this.country[0]['value'] === 'others' ? this.addItemsOthers() : this.form.addControl('items', new FormArray([this.createItem({})]));
      }
    });

  }

  addItemsIndia(): void {
    this.form.addControl('name', new FormControl(this.payment.filter((a) => a.key.toLowerCase() === "account holder name")[0].value || ''));
    this.form.addControl('pannumber', new FormControl(this.payment.filter((a) => a.key.toLowerCase() === "pan")[0].value || '', [this.validatePanNumber]));
    this.form.addControl('branch', new FormControl(this.payment.filter((a) => a.key.toLowerCase() === "branch")[0].value || ''));
    this.form.addControl('bankname', new FormControl(this.payment.filter((a) => a.key.toLowerCase() === "bank name")[0].value || ''));
    this.form.addControl('accountnumber', new FormControl(this.payment.filter((a) => a.key.toLowerCase() === "account number")[0].value || '', [Validators.required, this.validateAccountNumber]));
    this.form.addControl('ifsccode', new FormControl(this.payment.filter((a) => a.key.toLowerCase() === "ifsc code")[0].value || ''));
  }

  addNullItemsIndia(): void {
    this.form.addControl('name', new FormControl(''));
    this.form.addControl('pannumber', new FormControl('', [this.validatePanNumber]));
    this.form.addControl('branch', new FormControl(''));
    this.form.addControl('bankname', new FormControl(''));
    this.form.addControl('accountnumber', new FormControl('', [Validators.required, this.validateAccountNumber]));
    this.form.addControl('ifsccode', new FormControl(''));
  }

  addItemsOthers(): void {
    if (this.payment && this.payment.length > 0) {
      this.form.addControl('items', new FormArray([]));
      this.payment.forEach(val => {
        this.addItem(val);
      });
    } else {
      this.form.addControl('items', new FormArray([this.createItem({})]));
    }
  }

  createItem(val): FormGroup {
    return this.fb.group({
      key: val && val.key || '',
      value: val && val.value || ''
    });
  }


  addItem(val): void {
    this.items = this.form.get('items') as FormArray;
    this.items.push(this.createItem(val));
  }

  deleteItem(index): void {
    console.log('index', index);
    this.form.get('items')['controls'].splice(index, 1);
  }

  close(): void {
    this.dialogRef.close();
  }

  validatePanNumber(control: AbstractControl) {
    if (!(/^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/.test(control.value))) {
      return { inValidPan: true };
    }
    return null;
  }

  validateAccountNumber(control: AbstractControl) {
    if (!(/^[0-9]*$/.test(control.value))) {
      return { inValidAn: true };
    }
    return null;
  }


  saveForm() {
    let postVal = [];
    if (this.form.invalid) {
      return;
    }
    if (this.form.value.location === "india") {
      let keys = Object.keys(this.form.value);
      let cur = this;
      keys.forEach(ele => {
        let obj = {};
        if (ele === "location") {
          obj['key'] = "Country";
        } else if (ele === "accountnumber") {
          obj['key'] = "Account number";
        } else if (ele === "bankname") {
          obj['key'] = "Bank name";
        } else if (ele === "branch") {
          obj['key'] = "Branch";
        } else if (ele === "ifsccode") {
          obj['key'] = "Ifsc code";
        } else if (ele === "name") {
          obj['key'] = "Account holder name";
        } else if (ele === "pannumber") {
          obj['key'] = "PAN";
        }
        obj['value'] = cur.form.value[ele];
        postVal.push(obj);
      });
    } else {
      let obj = {};
      obj['key'] = "Country";
      obj['value'] = this.form.value['location'];
      postVal.push(obj);
      this.form.value['items'].forEach(ele => {
        postVal.push(ele);
      });
    }
    this.dialogRef.close(postVal);
  }

}
