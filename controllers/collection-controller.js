const collectionService = require('../service/collection-service');

class CollectionController {

    async newCollection(req, res, next) {
        try {
            // TODO: name validator (not empty)
            // TODO: get author by server (for security)
            const {name, content, author} = req.body;
            const collectionData = await collectionService.newCollection(name, content, author);
            return res.json(collectionData);
        } catch (e) {
            next(e);
        }
    }

    async getCollections(req, res, next) {
        // TODO: public/private scripts
        try {
            const {author} = req.body;
            const collections = await collectionService.getCollections(author);
            return res.json({collections}); // TODO: remove sub-object
        } catch (e) {
            next(e);
        }
    }

    async removeCollection(req, res, next) {
        try {
            const {id} = req.body;
            const collection = await collectionService.removeCollection(id);
            return res.json({collection}); // TODO: remove sub-object 2
        } catch (e) {
            next(e);
        }
    }

    async updateCollection(req, res, next) {
        try {
            const {collection} = req.body;
            return res.json(await collectionService.updateCollection(collection));
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new CollectionController();
