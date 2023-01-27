import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterPayload } from '../../models/payloads/create-user.payload';
import { LoginPayload } from '../../models/payloads/login.payload';
import { HelperService } from '../../services/helper.service';
import { UserService } from '../../services/user.service';
import { CustomValidators } from '../../utils/validators';
import isValidEmail = CustomValidators.isValidEmail;
import isValidPassword = CustomValidators.isValidPassword;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(
    private readonly userService: UserService,
    private readonly helperService: HelperService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  @ViewChild('borderPage')
  public borderPage?: ElementRef<HTMLDivElement>;

  public isRegister: boolean = false;

  public showPasswordLogin: boolean = false;

  public showPasswordRegister: boolean = false;

  public showPasswordRegisterConfirm: boolean = false;

  public isValidPhone: boolean = false;

  public isLoading: boolean = false;

  public autocompleteEmail: boolean = false;

  public autocompleteConfirmEmail: boolean = false;

  public registerPayload: RegisterPayload = {
    id: 0,
    name: '',
    age: undefined,
    email: '',
    password: '',
    confirmEmail: '',
    confirmPassword: '',
    phone: '',
  };

  public loginPayload: LoginPayload = {
    id: 0,
    email: '',
    password: '',
  };

  public canLogin(): boolean {
    return isValidEmail(this.loginPayload.email) && isValidPassword(this.loginPayload.password);
  }

  public canRegister(): boolean {
    return !this.autocompleteEmail && !this.autocompleteConfirmEmail
      && this.registerPayload.email === this.registerPayload.confirmEmail
      && isValidPassword(this.registerPayload.password && this.registerPayload.confirmPassword)
      && this.registerPayload.password === this.registerPayload.confirmPassword
      && this.registerPayload.phone.length == 14 && this.registerPayload.name.length >= 3;
  }

  public async login(user: LoginPayload): Promise<void> {
    const response = await this.userService.login(user);
    console.log(response);

    if (!response) {
      await this.helperService.createAlert({
        header: 'Oopss...',
        message: 'Usuário ou senha incorretos, tente novamente!',
        buttons: ['Entendido']
      });
    } else {
      await this.helperService.createToast({
        message: 'Logado com sucesso! Aproveite o Vinimail!',
        position: 'bottom'
      });
      await this.router.navigateByUrl('/outbox');
    }
  }

  public async registerUser(user: RegisterPayload): Promise<void> {
    await this.userService.create(user);

    await this.helperService.createToast({
      message: 'Bem vindo ao Vinimail!',
      position: 'bottom'
    });
    await this.router.navigateByUrl('/outbox');
  }

  public updateHeight(): void {
    const delay = 0;
    if (this.borderPage?.nativeElement) {
      const el = this.borderPage.nativeElement;
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

  public applyMask(phone: string): void {
    const deveTerTracinho = phone.length >= 9;
    this.registerPayload.phone = phone.replace(/\D/g, '')
      .replace(/^([1-9]{1,2})([1-9]{0,5})([1-9]{0,4})/, deveTerTracinho ? '($1)$2-$3' : '($1)$2');
  }

  public verifyAt(email: string): void {
    email.includes('@') ? this.autocompleteEmail = true : this.autocompleteEmail = false;
    this.registerPayload.email = email;
  }

  public verifyConfirmAt(email: string): void {
    this.autocompleteConfirmEmail = email.includes('@');
  }

}
