module.exports = class UserDto {
    email;
    id;
    isActivated;
    scripts;
    collections;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.scripts = model.scripts;
        this.collections = model.collections;
    }
}
