import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Store from 'App/Models/Store'

export default class StoresController {


    public async getAll(ctx: HttpContextContract) {

        var result = await Store.query().preload("managerStaff");
        return result;
    }
}
