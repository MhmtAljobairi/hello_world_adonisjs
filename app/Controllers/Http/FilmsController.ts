import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class FilmsController {

    public async getAll(ctx: HttpContextContract) {
        try {
            return Database.from('films_123').select('*');
        } catch (ex) {
            return ctx.response.badRequest({ message: "There are an error on the platform, please try later." })
        }
    }
}
