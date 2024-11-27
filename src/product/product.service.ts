import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  private readonly DEFAULT_LIMIT = 10;
  constructor(private readonly prisma : PrismaService){}

  async create(createProductDto: CreateProductDto) {
    const data = {
      ...createProductDto
    };
    const createdProduct = await this.prisma.product.create({ data });

    return {
      ...createdProduct
    }
  }


  async findAll(page: number) {
    try {
      const limit = this.DEFAULT_LIMIT;
      const skip = (page - 1) * limit;

      const [products, totalCount] = await this.prisma.$transaction([
        this.prisma.product.findMany({
          skip: skip,
          take: limit,
        }),
        this.prisma.product.count(),
      ]);
      return {
        products,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      }
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar produtos')  
    }
    
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const Product = await this.prisma.product.findUnique({ where: { id } });
  
    if (!Product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    
    const updateProduct = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });

    return updateProduct

  }

  async deleteProduct(id: string) {
    const Product = await this.prisma.product.delete({
      where:{id}
    })

    if (!Product) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }
    return Product;
  }
  
}
