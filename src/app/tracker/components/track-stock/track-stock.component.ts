import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'st-track-stock',
  templateUrl: './track-stock.component.html',
  styleUrls: ['./track-stock.component.scss']
})
export class TrackStockComponent implements OnInit {

  form: FormGroup;
  readonly STOCK_INPUT_FORM_KEY = 'stockInputFormKey';
  @Output()
  readonly trackStock = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      [this.STOCK_INPUT_FORM_KEY]: this.formBuilder.control(null, Validators.required)
    });
  }

  track(): void {
    this.trackStock.emit(this.form.controls[this.STOCK_INPUT_FORM_KEY].value);
    this.form.controls[this.STOCK_INPUT_FORM_KEY].reset();
  }
}
