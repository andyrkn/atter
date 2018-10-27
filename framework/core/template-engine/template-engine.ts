export class TemplateEngine {

    public static interpret(template: string): Function {
        const interpretation: Function = new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
            "with(obj){p.push('" +
            template
                .replace(/[\r\t\n]/g, " ")
                .split("<<").join("\t")
                .replace(/((^|\>>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)\>>/g, "',$1,'")
                .split("\t").join("');")
                .split(">>").join("p.push('")
                .split("\r").join("\\'")
            + "');}return p.join('');");
        return interpretation;
    }
}