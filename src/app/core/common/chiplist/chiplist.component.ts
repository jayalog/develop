import { Component, Output, Input, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChipInputEvent, MatAutocompleteTrigger } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
// import { MatChipsModule } from '@angular/material/chips';
// import { industries } from '../../data/industry';

@Component({
  selector: 'chiplist',
  templateUrl: './chiplist.component.html',
  styleUrls: ['./chiplist.component.scss']
})
export class ChipListComponent {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  // textInput: FormControl;
  disable = false;
  filteredList: string[];
  form: FormGroup;

  @Input() autoCompleteList: string[];
  @Input() addedChips: string[];
  @Input() hint: string;

  @Output() modifiedChips = new EventEmitter();

  @ViewChild('Input') input: ElementRef;
  @ViewChild('Input', { read: MatAutocompleteTrigger }) autoComplete: MatAutocompleteTrigger;
  constructor( private fb: FormBuilder) { }

  ngOnInit() {
     this.form = this.fb.group({
      textInput: [null],
     });
    // this.textInput = new FormControl();
    this.toggleInput();
    this.filteredList = this.autoCompleteList;
  }

  // ngAfterContentInit() {
  //   this.textInput = new FormControl();
  //   this.toggleInput();
  // }

  addChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.addedChips.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeChip(item: string): void {
    const index = this.addedChips.indexOf(item);

    if (index >= 0) {
      this.addedChips.splice(index, 1);
    }
    this.toggleInput();
    this.input.nativeElement.focus();
  }

  selected(event): void {
    this.addedChips.push(event.option.viewValue);
    this.input.nativeElement.value = '';
    this.form.get('textInput').patchValue('');
    this.modifiedChips.emit(this.addedChips);
    this.toggleInput();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim() && this.addedChips.length <= 9) {
      this.addedChips.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.form.get('textInput').patchValue(null);
    this.modifiedChips.emit(this.addedChips);
    this.toggleInput();
    this.autoComplete.closePanel();
    // this.togglePanel();
  }

  toggleInput() {
    if (this.addedChips.length === 10) {
      this.disable = true;
    } else {
      this.disable = false;
    }
  }

  foucusAutoComplete() {
    this.autoComplete.openPanel();
  }

  closeDropdown() {
    this.autoComplete.closePanel();
  }

  filterDropdown(val: string) {
    console.log('model change');
    this.filteredList = this.autoCompleteList.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  // togglePanel() {
  //   if (this.addedChips.length < 10) {
  //     this.autoComplete.openPanel();
  //   } else
  //     this.autoComplete.closePanel();
  // }


}
