import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {



    public async getAll(ctx: HttpContextContract) {

        return "Get All Users";
    }
}
