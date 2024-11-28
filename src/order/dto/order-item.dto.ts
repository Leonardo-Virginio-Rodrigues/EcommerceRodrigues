import { ApiProperty } from '@nestjs/swagger'


export class OrderItem {
    @ApiProperty()
    productId: string

    @ApiProperty()
    amount: number
    
}