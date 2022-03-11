import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { StepBaseComponent } from '@core/modules/elements/stepper/step-base/step-base.component';

import { MoreInformationEvent } from '../../models/more-information-event.model';

@Component({
  selector: 'app-more-information',
  templateUrl: './more-information.component.html',
  styleUrls: ['./more-information.component.scss']
})

export class MoreInformationComponent extends StepBaseComponent<MoreInformationEvent> implements OnInit {
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      entryFee: new FormControl(''),
      isRetroGamesOnly: new FormControl(false),
      isChildFriendly: new FormControl(false),
      isFoodServed: new FormControl(false),
    });

    this.form
      .valueChanges
      .subscribe(
        val => this.events.emit(new MoreInformationEvent(this.form.value))
      );
  }



}
