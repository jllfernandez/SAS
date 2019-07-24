import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttonsbox',
  templateUrl: './buttonsbox.component.html',
  styleUrls: ['./buttonsbox.component.scss']
})
export class ButtonsboxComponent implements OnInit {
  @Input() leftButtons: Array<any>;
  @Input() rightButtons: Array<any>;

  @Output() selectedButton = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  buttonClicked(button: any) {
    console.log('Row clicked: ', button.action);
    this.selectedButton.emit(button);
  }
}
