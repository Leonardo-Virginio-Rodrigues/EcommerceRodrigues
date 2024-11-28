import { OrderItem, User } from "@prisma/client";

export class Order {
    id: string;
    data: Date;
    totalValue: number;
    status: string;
    paymentMethod: string;
    user: User;
    userId: string;
    items: OrderItem[]
}
