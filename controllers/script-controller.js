const scriptService = require('../service/script-service');

class ScriptController {

    async newScript(req, res, next) {
        try {
            // TODO: name validator (not empty)
            // TODO: get author by server (not client)
            const {name, content, config, author} = req.body;
            const scriptData = await scriptService.newScript(name, content, config, author);
            return res.json(scriptData);
        } catch (e) {
            next(e);
        }
    }

    async getScripts(req, res, next) {
        // TODO: public/private scripts
        try {
            const {author} = req.body;
            const scripts = await scriptService.getScripts(author);
            return res.json({scripts});
        } catch (e) {
            next(e);
        }
    }

    async removeScript(req, res, next) {
        try {
            const {id} = req.body;
            const script = await scriptService.removeScript(id);
            return res.json({script});
        } catch (e) {
            next(e);
        }
    }

    async updateScript(req, res, next) {
        try {
            const {script} = req.body;
            return res.json(scriptService.updateScript(script));
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new ScriptController();
