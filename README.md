# Aceleradora Agil Desafio 
A API foi desenvolvida em node.js e para persistir os dados foi utilizado o MongoDB.
## Como Rodar

### 1. Pré-requisitos
- Node, MongoDB

### 2. Instalar Dependências
npm install

### 3. Configurar o Enviroment 
 - Criar um arquvio .env com as informações do env.example.

### 4. Rodar o Servidor
npm run dev


### POST - Criar Produto

POST http://localhost:3000/api/produtos

Body (JSON):
{
  "nome": "Notebook",
  "categoria": "Eletrônicos",
  "quantidade": 10,
  "preco": 2500.00
}


### GET - Listar Todos

GET http://localhost:3000/api/produtos


### GET - Filtrar por Categoria

GET http://localhost:3000/api/produtos?categoria=Eletrônicos


### GET - Ordenar por Nome/Quantidade/Preço

GET http://localhost:3000/api/produtos?sortBy=nome


### GET - Buscar por ID

GET http://localhost:3000/api/produtos/search?id=ID_DO_PRODUTO


### GET - Buscar por Nome

GET http://localhost:3000/api/produtos/search?nome=Notebook


### PUT - Atualizar Produto

PUT http://localhost:3000/api/produtos/ID_DO_PRODUTO

Body (JSON):
{
  "preco": 2300.00,
  "quantidade": 8
}


### DELETE - Deletar Produto

DELETE http://localhost:3000/api/produtos/ID_DO_PRODUTO
