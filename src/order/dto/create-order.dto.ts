
import { IsArray,  IsNumber, IsString } from "class-validator";
import { OrderItem } from "./order-item.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty()
    @IsArray()
    itens: OrderItem[];

    @IsString()
    @ApiProperty()
    status: string;

    @IsString()
    @ApiProperty()
    paymentMethod: string;

}
