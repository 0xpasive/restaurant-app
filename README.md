<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description
This is a simple NestJS-based REST API that implements CRUD operations for a restaurant management system. The application uses PostgreSQL as the database, integrated via TypeORM.

The project is built as a learning exercise to understand the core concepts of NestJS—including modules, controllers, services, pipes, DTOs, validation, and dependency injection—as well as TypeORM fundamentals such as entities, repositories, and relationships.

The codebase follows a modular architecture and demonstrates clean separation of concerns between the API layer, business logic, and data persistence. 


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Database Setup
```bash
$ cd docker/postgere
$ docker compose up -d
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## API Endpoints

| Method | Endpoint        | Description             |
|------|-----------------|--------------------------|
| GET  | /menus          | Get all menu items       |
| GET  | /menus/:id      | Get menu by ID           |
| POST | /menus          | Create a menu item       |
| PUT  | /menus/:id      | Update a menu item       |
| DELETE | /menus/:id    | Delete a menu item       |

| Method | Endpoint          | Description                    | 
| ------ | ----------------- | ------------------------------ | 
| POST   | `/order`          | Create a new order             |            
| GET    | `/order`          | Get all orders                 |  
| POST   | `/order/add`      | Add items to an existing order | 
| DELETE | `/order/:id`      | Delete  an order by ID         | 
| GET    | `/order/:id/bill` | Generate bill for an order     | 


