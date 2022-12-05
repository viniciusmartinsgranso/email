import { Component, Input, OnInit } from '@angular/core';
import { EmailProxy } from '../../models/proxies/email.proxy';

@Component({
  selector: 'app-email-item',
  templateUrl: './email-item.component.html',
  styleUrls: ['./email-item.component.scss'],
})
export class EmailItemComponent implements OnInit {

  constructor() { }

  @Input()
  public email!: EmailProxy;

  ngOnInit() {
    console.log(this.email);
  }

}
