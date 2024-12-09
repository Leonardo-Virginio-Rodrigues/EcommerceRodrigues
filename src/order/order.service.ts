import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto, UserId: string) {

    const itemsWithPrice = await Promise.all(createOrderDto.itens.map(async (item) => {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId }, 
      });

      if (!product) {
        throw new Error(`Produto com ID ${item.productId} não encontrado.`);
      }

      
      return {
        productId: item.productId,
        amount: item.amount,
        unitPrice: product.price, 
      };
    }));

  
    const totalValue = itemsWithPrice.reduce((total, item) => total + (item.unitPrice * item.amount), 0);

   
    const data = {
      totalValue,
      status: createOrderDto.status,
      paymentMethod: createOrderDto.paymentMethod,
      userId: UserId,  
      items: {
        create: itemsWithPrice.map((item) => ({
          productId: item.productId,
          unitPrice: item.unitPrice, 
          amount: item.amount,
        })),
      },
    };

    const createdOrder = await this.prisma.order.create({
      data,
    });

    return createdOrder;
  }
}

