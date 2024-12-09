# EcommerceRodrigues

Este projeto é uma API RESTful para um sistema de e-commerce, desenvolvido com **NestJS**, **Prisma**, **SQLite3** e outras tecnologias. A API permite o cadastro de usuários, autenticação com JWT, gerenciamento de produtos e pedidos, entre outras funcionalidades.

## Tecnologias Usadas

- **NestJS**: Framework Node.js para construção de aplicações escaláveis.
- **Prisma**: ORM para manipulação de banco de dados.
- **SQLite3**: Banco de dados leve utilizado para o desenvolvimento e testes.
- **JWT (JSON Web Tokens)**: Autenticação e controle de acesso.
- **bcrypt**: Criptografia de senhas de usuários.
- **uuid**: Geração de IDs únicos para os recursos.

## Funcionalidades

- **Cadastro de Usuário**: Permite o cadastro de usuários com senha criptografada usando bcrypt.
- **Autenticação com JWT**: Sistema de login utilizando JWT para autenticação de usuários.
- **Controle de Acesso**: Decorador para tornar rotas públicas ou privadas.
- **Gerenciamento de Produtos**: Listagem, adição, remoção e visualização de produtos.
  - Listagem paginada de produtos.
  - Consulta de produto por ID.
- **Pedidos**: Funcionalidade para gerenciar pedidos realizados no sistema.
- **UUID para IDs**: Geração automática de IDs únicos.
