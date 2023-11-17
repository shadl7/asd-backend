const {Schema, model} = require('mongoose');

const CollectionSchema = new Schema({
    name: {type: String, default: ''},
    content: {type: [Schema.Types.ObjectId], default: [], ref: 'Script'},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = model('Collection', CollectionSchema);