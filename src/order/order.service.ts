import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto, UserId: string) {

    const itemsWithPrice = await Promise.all(createOrderDto.itens.map(async (item) => {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId }, // Verifica se o produto existe
      });

      if (!product) {
        throw new Error(`Produto com ID ${item.productId} não encontrado.`);
      }

      // Passo 2: Retornar o item com o preço do produto
      return {
        productId: item.productId,
        amount: item.amount,
        unitPrice: product.price,  // Preço do produto, que será preenchido automaticamente
      };
    }));

    // Passo 3: Calcular o totalValue (total da ordem)
    const totalValue = itemsWithPrice.reduce((total, item) => total + (item.unitPrice * item.amount), 0);

    // Passo 4: Criar a ordem
    const data = {
      totalValue,
      status: createOrderDto.status,
      paymentMethod: createOrderDto.paymentMethod,
      userId: UserId,  // Associando o ID do usuário ao pedido
      items: {
        create: itemsWithPrice.map((item) => ({
          productId: item.productId,
          unitPrice: item.unitPrice,  // Preço do produto do banco de dados
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

