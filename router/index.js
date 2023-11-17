const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const scriptController = require('../controllers/script-controller');
const collectionController = require('../controllers/collection-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);


router.post('/scripts', scriptController.getScripts) // TODO: CamelCase
router.post('/newscript', scriptController.newScript)
router.post('/removescript', scriptController.removeScript)
router.post('/updatescript', scriptController.updateScript)


router.post('/collections', collectionController.getCollections)
router.post('/newCollection', collectionController.newCollection)
router.post('/removeCollection', collectionController.removeCollection)
router.post('/updateCollection', collectionController.updateCollection)

module.exports = router
