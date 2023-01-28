import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { text } from 'ionicons/icons';
import { usersMock } from '../../../models/mocks/users.mock';
import { EmailProxy } from '../../../models/proxies/email.proxy';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor() { }

  @ViewChild('textBorder')
  public textBorder?: ElementRef<HTMLDivElement>;

  public emailPayload: EmailProxy = {
    id: 0,
    title: '',
    userWriter: usersMock[0],
    userReceiver: usersMock[0],
    isImportant: true,
    description: '',
  };

  ngOnInit() {
  }

  public resizeTextArea(div: HTMLTextAreaElement): void {
    if (this.textBorder?.nativeElement) {

      const prevHeight = div.style.height;
      div.style.height = 'auto';
      const newHeight = div.scrollHeight + 'px';
      div.style.height = prevHeight;
      div.style.height = newHeight;
      console.log('');
    }
  }

  public getBase64(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        this.emailPayload.photoUrl = reader.result.toString();
      }
    };
    reader.onerror = error => {
      console.log('Error: ', error);
    };
  }

  public deleteBase64(): void {
    this.emailPayload.photoUrl = undefined;
  }

}
