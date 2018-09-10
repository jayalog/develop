import { Component, ViewChild, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'range-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class RangeSlider implements OnInit {
    pos1 = 0;
    pos2 = 0;
    pos3 = 0;
    pos4 = 0;
    maxValue: number;
    minValue: number;
    currentValue: Number;
    ratio: any;
    width: number;
    maxWidth: number;
    parentWidth: number;
    isMinError = false;
    isMaxError = false;
    @Input() minVal: number;
    @Input() maxVal: number;
    @Input() min = 1;
    @Input() max = 225;
    @Input() label: string;
    @Input() currencyType: string;
    @Output() onSliderChange: EventEmitter<any> = new EventEmitter();

    @ViewChild('rangeSlider') rangeSlider: ElementRef;
    @ViewChild('leftHandle') leftHandle: ElementRef;
    @ViewChild('rightHandle') rightHandle: ElementRef;
    @ViewChild('rangeHandle') rangeHandle: ElementRef;
    @ViewChild('leftInput') leftInput: ElementRef;
    @ViewChild('rightInput') rightInput: ElementRef;
    @ViewChild('leftText') leftText: ElementRef;
    @ViewChild('rightText') rightText: ElementRef;

    ngOnInit() {
        this.min = Number(this.min);
        this.max = Number(this.max);
        this.parentWidth = this.rangeSlider.nativeElement.parentElement.parentElement.offsetWidth;
        this.maxWidth = this.width = (this.rightHandle.nativeElement.offsetLeft - this.leftHandle.nativeElement.offsetLeft);
        this.ratio = ((this.max - this.min) + 1) / (this.width - 2);
        this.minValue = this.min;
        this.maxValue = this.max;
        if (this.minVal) {
            this.minValue = this.minVal;
            this.updateSliderMinValue();
        }
        if (this.maxVal) {
            this.maxValue = this.maxVal;
            this.updateSliderMaxValue();
        }
        this.width = (this.rightHandle.nativeElement.offsetLeft - this.leftHandle.nativeElement.offsetLeft);

    }

    focusInput(location) {
        if (location === 'left') {
            this.leftText.nativeElement.style.display = 'none';
            this.leftInput.nativeElement.focus();
        } else {
            this.rightText.nativeElement.style.display = 'none';
            this.rightInput.nativeElement.focus();
        }
    }

    onBlur(location) {
        if (location === 'left') {
            this.leftText.nativeElement.style.display = 'inline';
            if (this.currentValue < this.min || this.isMinError) {
                this.minValue = this.leftInput.nativeElement.value = this.min;
                this.updateSliderMinValue();
            } else if (this.currentValue >= this.maxValue) {
                this.leftInput.nativeElement.value = this.minValue;
            } else {
                this.minValue = this.leftInput.nativeElement.value;
                this.updateSliderMinValue();
            }
            this.currentValue = this.minValue;
            this.isMinError = false;
        } else {
            this.rightText.nativeElement.style.display = 'inline';
            if (this.currentValue > this.max || this.isMaxError) {
                this.maxValue = this.rightInput.nativeElement.value = this.max;
                this.updateSliderMaxValue();
            } else if (this.currentValue <= this.minValue) {
                this.rightInput.nativeElement.value = this.maxValue;
            } else {
                this.maxValue = this.rightInput.nativeElement.value;
                this.updateSliderMaxValue();
            }
            this.currentValue = this.maxValue;
            this.isMaxError = false;
        }
        this.onSliderChange.emit({ 'min': this.minValue, 'max': this.maxValue });
    }

    updateSliderMinValue() {
        const offSetValue = Math.round(Number(this.minValue) / this.ratio);
        this.leftHandle.nativeElement.style.left = ((offSetValue - 12) <= -11) ? '-12px' : (offSetValue - 12) + 'px';
        this.rangeHandle.nativeElement.style.width = (this.rightHandle.nativeElement.offsetLeft - this.leftHandle.nativeElement.offsetLeft) + "px";
        this.rangeHandle.nativeElement.style.left = (offSetValue) + "px";

    }
    updateSliderMaxValue() {
        let offSetValue = Math.round(Number(this.maxValue) / this.ratio);
        this.rightHandle.nativeElement.style.left = (offSetValue) + "px";
        this.rangeHandle.nativeElement.style.width = (this.rightHandle.nativeElement.offsetLeft - this.leftHandle.nativeElement.offsetLeft) + "px";
    }

    isNumber(e) {
        e = e || window.event;
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode === 8 || charCode === 46 || charCode === 37 || charCode === 39)
            return true;
        return /\d/.test(String.fromCharCode(charCode));
    }

    onMinKeyDown(event) {
        if (!this.isNumber(event)) {
            event.preventDefault();
            return false;
        }
    }

    onMinKeyUp(event) {
        this.currentValue = Number(event.currentTarget.value);
        let stringValue = event.currentTarget.value.toString();
        this.isMinError = (this.currentValue < this.min) || (stringValue.substr(0, 1) === '0') || (this.currentValue > this.max);
    }

    onMaxKeyUp(event) {
        this.currentValue = Number(event.currentTarget.value);
        let stringValue = event.currentTarget.value.toString();
        this.isMaxError = (this.currentValue > this.max) || (stringValue.substr(0, 1) === '0') || (this.currentValue < this.min);
    }

    onMaxKeyDown(event) {
        if (!this.isNumber(event)) {
            event.preventDefault();
            return false;
        }
    }

    leftHandleDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        document.onmouseup = this.closeDragElement.bind(this);
        // call a function whenever the cursor moves:
        document.onmousemove = this.leftHanldeDrag.bind(this);
    }

    leftHanldeDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        if ((this.leftHandle.nativeElement.offsetLeft - this.pos1) <= -12) {
            this.leftHandle.nativeElement.style.left = "-12px";
            this.rangeHandle.nativeElement.style.left = "0.5px";
        } else if ((this.leftHandle.nativeElement.offsetLeft - this.pos1) >= (this.maxWidth - 32))
            this.leftHandle.nativeElement.style.left = (this.maxWidth - 32) + "px";
        else {
            let leftPosition = (this.leftHandle.nativeElement.offsetLeft - this.pos1);
            if (leftPosition >= (this.rightHandle.nativeElement.offsetLeft - 20))
                leftPosition = this.rightHandle.nativeElement.offsetLeft - 20;

            this.leftHandle.nativeElement.style.left = leftPosition + "px";
            this.rangeHandle.nativeElement.style.left = (leftPosition + 12 + 0.5) + "px";
        }
        this.rangeHandle.nativeElement.style.width = (this.rightHandle.nativeElement.offsetLeft - this.leftHandle.nativeElement.offsetLeft) + "px";
        this.updateMinandMax(true);
        // set the element's new position:
    }

    rightHandleDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        document.onmouseup = this.closeDragElement.bind(this);
        // call a function whenever the cursor moves:
        document.onmousemove = this.rightHanldeDrag.bind(this);
    }

    rightHanldeDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        if ((this.rightHandle.nativeElement.offsetLeft - this.pos1) <= 8) {
            this.rightHandle.nativeElement.style.left = '8px';
        } else if ((this.rightHandle.nativeElement.offsetLeft - this.pos1) >= (this.maxWidth - 12)) {
            this.rightHandle.nativeElement.style.left = (this.maxWidth - 12) + "px";
        } else {
            let leftPosition = (this.rightHandle.nativeElement.offsetLeft - this.pos1);
            if ((this.leftHandle.nativeElement.offsetLeft + 20) >= leftPosition) {
                leftPosition = this.leftHandle.nativeElement.offsetLeft + 20;
            }
            this.rightHandle.nativeElement.style.left = leftPosition + 'px';
        } // tslint:disable-next-line:max-line-length
        this.rangeHandle.nativeElement.style.width = (this.rightHandle.nativeElement.offsetLeft - this.leftHandle.nativeElement.offsetLeft) + 'px';
        this.updateMinandMax(false);
    }

    updateMinandMax(isMin) {
        if (isMin) { // tslint:disable-next-line:max-line-length
            this.minValue = (this.rangeHandle.nativeElement.offsetLeft === 1) ? this.min : Math.round(this.rangeHandle.nativeElement.offsetLeft * this.ratio);
            if (this.minValue < this.min) {
                this.minValue = this.min;
            }
        } else { // tslint:disable-next-line:max-line-length
            this.maxValue = (this.rightHandle.nativeElement.offsetLeft === (this.maxWidth - 12)) ? this.max : Math.round((this.rightHandle.nativeElement.offsetLeft) * this.ratio);
            if (this.maxValue > this.max) {
                this.maxValue = this.max;
            }
        }
        this.onSliderChange.emit({ 'min': this.minValue, 'max': this.maxValue });
    }

    closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
