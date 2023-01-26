import { Injectable } from '@angular/core';
import { CreateUserPayload, RegisterPayload } from '../models/payloads/create-user.payload';
import { LoginPayload } from '../models/payloads/login.payload';
import { UpdateUserPayload } from '../models/payloads/update-user.payload';
import { UserProxy } from '../models/proxies/user.proxy';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() {}

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
    console.log(storage);

    const newList = storage.filter((userStorage) => {
      if (userStorage.id !== user) {
        return userStorage;
      } else return false;
    });

    storage.push(...newList);
    localStorage.setItem('users', JSON.stringify(newList));
    localStorage.removeItem('loggedUser');
  }

  public async login(user: LoginPayload): Promise<boolean> {
    localStorage.removeItem('loggedUser');
    const table = localStorage.getItem('users');
    const storage: LoginPayload[] = table ? JSON.parse(table) : false;

    if (!storage.length) return false;

    const loggedUser = storage.map(currentUser => {
      if (currentUser.email === user.email && currentUser.password === user.password) {
        return currentUser;
      } else return [];
    });

    if (!loggedUser.length) return false;

    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    return true;
  }

  public logoutUser(): void {
    return localStorage.removeItem('loggedUser');
  }
}
