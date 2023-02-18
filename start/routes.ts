/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'



Route.group(() => {
  Route.group(() => {
    Route.get("/init", "UsersController.getInit");
    Route.get("/:variable/orders", "UsersController.getUserOrders");
    Route.get("/:variable", "UsersController.getById");
    Route.get("/", "UsersController.getAll");
    Route.post("/", "UsersController.create");
    Route.put("/", "UsersController.update");
    Route.delete("/", "UsersController.destroy");
  }).prefix("/users");


  Route.group(() => {
    Route.get("/", "FilmsController.getAll");
  }).prefix("/films");

  Route.group(() => {
    Route.get("/:id", "ActorsController.getById");
    Route.get("/", "ActorsController.getAll");
    Route.post("/", "ActorsController.create");
    Route.put("/", "ActorsController.update");
    Route.delete("/:id", "ActorsController.destory");
  }).prefix("/actors");

  Route.group(() => {
    Route.get("/:id", "CitiesController.getById");
    Route.get("/", "CitiesController.getAll");
    Route.post("/", "CitiesController.create");
    Route.put("/", "CitiesController.update");
    Route.delete("/:id", "CitiesController.destory");
  }).prefix("/cities");
}).prefix("api");