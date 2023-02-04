import { Injectable } from '@angular/core';
import { CreateEmailPayload } from '../models/payloads/create-email.payload';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  public async create(email: CreateEmailPayload): Promise<void> {
    const table = localStorage.getItem('email');
    const storageEmails: CreateEmailPayload[] = table ? JSON.parse(table) : [];

    email.id = email.id === 0 ? 1 : storageEmails[storageEmails.length - 1].id + 1;

    console.log(email);
    storageEmails.push(email);
    console.log(storageEmails);
    // localStorage.setItem('email', JSON.stringify(storageEmails));
  }
}
