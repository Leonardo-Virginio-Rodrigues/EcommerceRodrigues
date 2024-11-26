import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }
  
async create(createUserDto: CreateUserDto) {
    
  const data = {
    password: await bcrypt.hash(createUserDto.password, 10),
    ...createUserDto,
  };
  const createdUser = await this.prisma.user.create({ data });
  
  return {
    ...createdUser,
    password: undefined,
  }

  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
