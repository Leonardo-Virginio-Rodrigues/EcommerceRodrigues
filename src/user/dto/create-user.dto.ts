import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/, {
    message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).',
  })
  password: string;

  @IsString()
  name: string;

  @IsNumber()
  phone: number;

}