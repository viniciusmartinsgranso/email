export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  age?: number;
  phone: string;
}

export interface RegisterPayload extends CreateUserPayload {
  confirmPassword: string;
  confirmEmail: string;
  id: number;
}
