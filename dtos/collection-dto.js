module.exports = class ScriptDto {
    name;
    id;
    content;
    author;

    constructor(model) {
        this.name = model.name;
        this.id = model._id;
        this.content = model.content;
        this.config = model.config;
        this.author = model.author;
    }
}