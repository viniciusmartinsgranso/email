import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertOptionsInterface } from '../models/interfaces/alert-options.interface';
import { CreateUserPayload, RegisterPayload } from '../models/payloads/create-user.payload';
import { LoginPayload } from '../models/payloads/login.payload';
import { UpdateUserPayload } from '../models/payloads/update-user.payload';
import { UserProxy } from '../models/proxies/user.proxy';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private readonly modalController: ModalController,
    private readonly helperService: HelperService,
    private readonly router: Router,
  ) {}

  public user: CreateUserPayload[] = [
    {
      name: '',
      password: '',
      email: '',
      age: undefined,
      phone: '',
    },
  ];

  public async get(): Promise<UserProxy> {
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : false;
  }

  public async create(user: RegisterPayload): Promise<void> {
    localStorage.removeItem('loggedUser');
    const table = localStorage.getItem('users');
    const storageUsers: RegisterPayload[] = table ? JSON.parse(table) : [];

    user.id = user.id === 0 ? 1 : storageUsers[storageUsers.length - 1].id + 1;

    user.email = user.email + '@vinimail.com';
    user.confirmEmail = user.confirmEmail + '@vinimail.com';

    storageUsers.push(user);
    localStorage.setItem('users', JSON.stringify(storageUsers));
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  public update(user: UpdateUserPayload): void {
    const table = localStorage.getItem('users');
    const storageUsers = table ? JSON.parse(table) : [];

    const newUser = storageUsers.filter((us: RegisterPayload) => {
      if (us.id === user.id) {
        us.name = user.name;
        us.email = user.email;
        us.confirmEmail = user.email;
        us.phone = user.phone;
        us.age = user.age;
        us.password = user.email;
        us.confirmPassword = user.password;
        return us;
      } else {
        return [];
      }
    });

    console.log(newUser);
    // storageUsers.push(newUser);
    // localStorage.setItem('users', JSON.stringify(storageUsers));
    // localStorage.setItem('loggedUser', JSON.stringify(storageUsers));
  }

  public async delete(user: number): Promise<void> {
    const table = localStorage.getItem('users');
    const storage: UpdateUserPayload[] = table ? JSON.parse(table) : [];

    const newList = storage.filter((userStorage) => {
      if (userStorage.id !== user) {
        return userStorage;
      } else return false;
    });

    storage.push(...newList);
    localStorage.setItem('users', JSON.stringify(newList));
    localStorage.removeItem('loggedUser');
  }

  public async deleteUser(options: AlertOptionsInterface, user: UpdateUserPayload): Promise<void> {
    await this.helperService.createAlert({
      header: options.header,
      message: options.message,
      cssClass: ['alert-wrapper', 'alert-title', 'alert-1-msg', 'alert-button'],
      buttons: [
        {
          text: 'Deseja realmente excluir sua conta?',
          handler: async () => {
            await this.delete(user.id);
            await this.modalController.dismiss();
            await this.router.navigateByUrl('/login#login');
            setTimeout(async () => {

              await this.helperService.createToast({
                message: 'Usuário deletado com sucesso',
                position: 'bottom',
                duration: 2000,
              });
            }, 500);
          },
        },
        {
          text: 'Não! Cliquei sem querer hehe',
        },
      ],
    });
  }

  public async login(user: LoginPayload): Promise<boolean> {
    localStorage.removeItem('loggedUser');
    const table = localStorage.getItem('users');
    const storage: LoginPayload[] = table ? JSON.parse(table) : false;

    if (!storage.length) return false;

    const loggedUser = storage.find(currentUser => {
      return currentUser.email === user.email && currentUser.password === user.password;
    });

    if (!loggedUser) return false;

    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    console.log(localStorage.getItem('loggedUser'));
    return true;
  }

  public async logoutUser(): Promise<void> {
    await this.router.navigateByUrl('/login#login');
    return localStorage.removeItem('loggedUser');
  }
}
