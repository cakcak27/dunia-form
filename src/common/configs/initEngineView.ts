import { NestExpressApplication } from "@nestjs/platform-express";
import { engine } from 'express-handlebars';
import { helpers } from "./hbs/helpers";

export const initEngineView = (app: NestExpressApplication) => {

    app.engine('hbs', engine({
        extname: '.hbs',
        defaultLayout: false,
        partialsDir: 'views/partials',
        helpers: helpers
    }));

    app.setViewEngine('hbs');
}