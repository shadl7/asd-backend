const UserModel = require('../models/user-model');
const CollectionModel = require('../models/collection-model');
const CollectionDto = require('../dtos/collection-dto');
const mongoose = require("mongoose");

class CollectionService {
    async newCollection(name, content, author) {
        const collection = await CollectionModel.create({name, content, author})
        const collectionDto = new CollectionDto(collection);
        const user = await UserModel.findOne({_id: collectionDto.author})
        user.collections.push(collectionDto.id)
        user.save()
        return {collection: collectionDto}
    }
    async getCollections(user){
        // TODO: read author.collections and generate array from collectionDto
        return (await CollectionModel.find({author: mongoose.Types.ObjectId(user)}))
            .map((el) => {return new CollectionDto(el)});
    }

    async removeCollection(id) { // TODO: check script dependencies before remove
        const collection = await CollectionModel.findById(id)
        const collectionDto = new CollectionDto(collection);
        const authorID = collectionDto.author;
        UserModel.findByIdAndUpdate(authorID, {
            $pullAll: {
                collections: [{_id: collectionDto.id}],
            },
        }, function (err, docs) {});
        CollectionModel.findByIdAndRemove(id, function (err, docs) {})
        return collectionDto;
    }
    async updateCollection(collection) {
        return CollectionModel.findByIdAndUpdate(
            { _id: mongoose.Types.ObjectId(collection.id)},
            {name: collection.name, content: collection.content}
        )
    }
}

module.exports = new CollectionService();
