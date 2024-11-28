import { Controller, Post, Body, Request} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    const UserId = req.user.id;
    console.log(UserId)
    return this.orderService.create(createOrderDto, UserId);
  }

  
}
