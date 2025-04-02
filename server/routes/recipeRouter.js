const Router = require('express');
const recipeController = require('../controllers/recipeController');
const router = new Router();

router.get('/', recipeController.getRecipes);
router.get('/info/:id', recipeController.getRecipeInfo);

module.exports = router;
