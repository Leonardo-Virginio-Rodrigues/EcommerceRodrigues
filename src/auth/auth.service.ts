import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}
    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (user) {
            //Checar se a senha informada corresponde a hash que esta no banco
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined,
                };
            }
        }

        //Se chegar aqui não encontrou um user e/ou a senha não corresponde
        throw new Error('Email adress or password provided is incorrect.')
    }
}
