const {Schema, model} = require('mongoose');

const ScriptSchema = new Schema({
    name: {type: String, default: ''},
    content: {type: String, default: ''},
    config: {type: String, default: ''},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = model('Script', ScriptSchema);