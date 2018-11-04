import { Renderable } from "@web/core";
import { Router } from "@web/router";

@Renderable({
    template: require('./register.page.html'),
    style: require('./register.page.css')
})
export class RegisterPage {
}
