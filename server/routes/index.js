const Router = require('express');
const router = new Router();
const recipeRouter = require('./recipeRouter');

router.use('/recipe', recipeRouter);

module.exports = router;
