import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StepBaseComponent } from '@core/modules/elements/stepper/step-base/step-base.component';
import { MoreInformation } from '../../models/more-information.model';

@Component({
  selector: 'app-more-information',
  templateUrl: './more-information.component.html',
  styleUrls: ['./more-information.component.scss']
})

export class MoreInformationComponent extends StepBaseComponent<MoreInformation> implements OnInit {
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      entryFee: ['']
    });

    this.form
      .valueChanges
      .subscribe(
        val => this.events.emit(this.form.value)
      );
  }



}
