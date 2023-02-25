
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Actor from 'App/Models/Actor';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ActorsController {

    public async getAll(ctx: HttpContextContract) {

        var object = await ctx.auth.authenticate();
        var cityId = ctx.request.input("cityId");
        var typeId = ctx.request.input("typeId");

        var query = Actor.query();

        if (cityId) {
            query.where("city_id", cityId);
        }
        if (typeId) {
            query.where("type_id", typeId);
        }

        var result = await query;
        return result;
    }

    public async getById(ctx: HttpContextContract) {

        var id = ctx.params.id;
        var result = await Actor.findOrFail(id);
        return result;
    }

    public async create(ctx: HttpContextContract) {

        const newSchema = schema.create({
            first_name: schema.string(),
            last_name: schema.string(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })
        var actor = new Actor();
        actor.firstName = fields.first_name;
        actor.lastName = fields.last_name;
        var result = await actor.save();
        return result;

    }

    public async update(ctx: HttpContextContract) {
        const newSchema = schema.create({
            first_name: schema.string(),
            last_name: schema.string(),
            id: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })
        var id = fields.id;
        var actor = await Actor.findOrFail(id);
        actor.firstName = fields.first_name;
        actor.lastName = fields.last_name;
        var result = await actor.save();
        return result;
    }

    public async destory(ctx: HttpContextContract) {

        var id = ctx.params.id;
        var actor = await Actor.findOrFail(id);
        await actor.delete();
        return { message: "The actor has been deleted!" };
    }
}
