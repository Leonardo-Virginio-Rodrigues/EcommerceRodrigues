import { Controller, Get, Post, Body, Query, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new product' })
  @Post()
  create(@Body() createProductDto: CreateProductDto){
    return this.productService.create(createProductDto);
  }

  @IsPublic()
  @ApiOperation({summary: 'Get a especific product'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @IsPublic()
  @ApiOperation({ summary: 'Get all products per page' })
  @Get()
  findAll(
    @Query('page') page?: number
  ) {
    const pageNumber = page || 1;
    return this.productService.findAll(pageNumber);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product per page' })
  @Patch(':id')
  update(@Param('id') id : string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product per ID' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.deleteProduct(id)
  }

 
}
