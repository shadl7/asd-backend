const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    scripts: {type: [Schema.Types.ObjectId], ref: 'Script', required: true},
    collections: {type: [Schema.Types.ObjectId], ref: 'Collection', required: true}
})

module.exports = model('User', UserSchema);
