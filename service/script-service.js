const ScriptModel = require('../models/script-model');
const UserModel = require('../models/user-model');
const ScriptDto = require('../dtos/script-dto');
const mongoose = require("mongoose");

class ScriptService {
    async newScript(name, content, config, author) {
        const script = await ScriptModel.create({name, content, config, author})
        const scriptDto = new ScriptDto(script);
        const user = await UserModel.findOne({_id: scriptDto.author})
        user.scripts.push(scriptDto.id)
        user.save()
        return {script: scriptDto}
    }
    async getScripts(user){
        // TODO: read author.scripts and generate array from scriptDto
        return (await ScriptModel.find({author: mongoose.Types.ObjectId(user)}))
            .map((el) => {return new ScriptDto(el)});
    }

    async removeScript(id) {
        const script = await ScriptModel.findById(id)
        const scriptDto = new ScriptDto(script);
        const authorID = scriptDto.author;
        UserModel.findByIdAndUpdate(authorID, {
            $pullAll: {
                scripts: [{_id: scriptDto.id}],
            },
        }, function (err, docs) {});
        ScriptModel.findByIdAndRemove(id, function (err, docs) {})
        return scriptDto;
    }
    async updateScript(script) {
        return ScriptModel.findByIdAndUpdate(
            { _id: mongoose.Types.ObjectId(script.id)},
            {name: script.name, content: script.content, config: script.config}
        )
    }
}

module.exports = new ScriptService();
