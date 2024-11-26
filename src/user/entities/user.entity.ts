import { IsString, IsUUID, IsEmail } from 'class-validator';

export class User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
}