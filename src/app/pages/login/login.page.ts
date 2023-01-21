import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RegisterPayload } from '../../models/payloads/create-user.payload';
import { LoginPayload } from '../../models/payloads/login.payload';
import { CustomValidators } from '../../utils/validators';
import isValidEmail = CustomValidators.isValidEmail;
import isValidPassword = CustomValidators.isValidPassword;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('pai')
  public pai?: ElementRef<HTMLDivElement>;

  @ViewChild('loginDiv')
  public loginDiv?: ElementRef<HTMLDivElement>;

  @ViewChild('registerDiv')
  public registerDiv?: ElementRef<HTMLDivElement>;

  public isRegister: boolean = false;

  public showPasswordLogin: boolean = false;

  public isLoading: boolean = false;

  public register: RegisterPayload = {
    id: 0,
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmEmail: '',
    confirmPassword: '',
    phone: 0
  };

  public loginPayload: LoginPayload = {
    id: 0,
    email: '',
    password: '',
  }

  public canLogin(): boolean {
    return isValidEmail(this.loginPayload.email) && isValidPassword(this.loginPayload.password);
  }

  public login(user: LoginPayload): void {
    console.log(user);
  }

  public updateHeight(): void {
    const delay = 0;
    if (this.pai?.nativeElement) {
      const el = this.pai.nativeElement;
      setTimeout(() => {

        const prevHeight = el.style.height;
        el.style.height = 'auto';
        const newHeight = el.scrollHeight + 'px';
        el.style.height = prevHeight;

        setTimeout(() => {
          el.style.height = newHeight;
        }, 50);
      }, delay);
    }
  }

}
