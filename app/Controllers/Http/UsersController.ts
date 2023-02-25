import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';
import I18n from '@ioc:Adonis/Addons/I18n'

export default class UsersController {



    public async getAll(ctx: HttpContextContract) {


        return "Get All Users";
    }

    public async login(ctx: HttpContextContract) {
        var object = ctx.request.all();
        var email = object.email;
        var password = object.password;

        var result = await ctx.auth.attempt(email, password);
        return result;
    }


    public async logout(ctx: HttpContextContract) {
        var object = await ctx.auth.authenticate();
        await ctx.auth.logout();
        return { message: "Logout" }
    }

    public async create(ctx: HttpContextContract) {

        const newSchema = schema.create({
            email: schema.string({}, [
                rules.email(),
                rules.unique({
                    table: 'users',
                    column: 'email',
                })
            ]),
            password: schema.string(),
            full_name: schema.string(),
        },);


        var languageFromHeader = ctx.request.header('language');
        var langauge: string = languageFromHeader != null ? languageFromHeader : "ar";

        console.log("Language", langauge);
        const fields = await ctx.request.validate({
            schema: newSchema,
            messages: {
                required: 'The {{ field }} is required to create a new account',
                'email.unique': 'Email not available',
                'email.required': I18n
                    .locale(langauge)
                    .formatMessage('users.required', { field: "email" }),
                'email.email': 'Email must be an email format',
            }
        });


        var user = new User();

        user.fullName = fields.full_name;
        user.email = fields.email;
        user.password = fields.password;
        var newUser = await user.save();
        return newUser;

    }
}
