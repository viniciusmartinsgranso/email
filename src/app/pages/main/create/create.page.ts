import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { usersMock } from '../../../models/mocks/users.mock';
import { CreateEmailPayload } from '../../../models/payloads/create-email.payload';
import { LoginPayload } from '../../../models/payloads/login.payload';
import { UserProxy } from '../../../models/proxies/user.proxy';
import { EmailService } from '../../../services/email.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  @ViewChild('textBorder')
  public textBorder?: ElementRef<HTMLDivElement>;

  public emailPayload: CreateEmailPayload = {
    id: 0,
    title: '',
    userWriter: usersMock[0],
    userReceiver: usersMock[0],
    description: '',
  };

  public user: UserProxy = {
    email: '',
    age: 0,
    name: '',
    phone: '',
    id: 0,
    photoUrl: '',
    emailsReceived: [],
    emailsPosted: []
  };

  public usersList: UserProxy[] = [];

  public async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getUser(),
      this.getUsers(),
    ])
  }

  public resizeTextArea(div: HTMLTextAreaElement): void {
    if (this.textBorder?.nativeElement) {

      const prevHeight = div.style.height;
      div.style.height = 'auto';
      const newHeight = div.scrollHeight + 'px';
      div.style.height = prevHeight;
      div.style.height = newHeight;
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

  public async submitNewEmail(email: CreateEmailPayload): Promise<void> {
    email.userWriter = this.user;
    console.log(email.userReceiver);
   // await this.emailService.create(email);
  }

  public async getUsers(): Promise<void> {
    this.usersList = await this.userService.getUsers();
  }

  public async getUser(): Promise<void> {
    this.user = await this.userService.get()
  }

}
