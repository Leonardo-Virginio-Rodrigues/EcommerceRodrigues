import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, IsUrl } from "class-validator";

export class CreateProductDto { 
    @ApiProperty({description: 'Name of the product'})
    @IsString()
    name: string;

    @ApiProperty({ description: 'Description of the product' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'Image URL of the product' })
    @IsUrl()
    image: string;

    @ApiProperty({ description: 'Price of the product' })
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({ description: 'Stock amount of the product' })
    @IsNumber()
    @IsPositive()
    amountStock: number;
}

