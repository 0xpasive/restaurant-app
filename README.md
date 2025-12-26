

## Description
This is a Simple nestjs application. A simple CRUD operation for an restaurant system has been implemented in this application. Postgres Database is integrated using typeORM. This project was made to learn the basics of nest js and typeORM. This application includes concept of nestjs: module, controller, service, pipes, validator, dto, etc and typeORM: entity, repository , relations , etc. 


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


