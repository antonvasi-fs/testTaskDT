const axios = require('axios');

class RecipeController {
  async getRecipes(req, res) {
    try {
      const { filterType, filterValue } = req.query;
      const apiUrl = process.env.API_URL;

      let endpoint;
      if (filterType === 'ingredient') {
        endpoint = `/filter.php?i=${filterValue}`;
      } else if (filterType === 'country') {
        endpoint = `/filter.php?a=${filterValue}`;
      } else if (filterType === 'category') {
        endpoint = `/filter.php?c=${filterValue}`;
      } else {
        endpoint = `/search.php?s=`;
      }

      if (!endpoint) {
        return res.status(400).json({ message: 'Invalid filter type' });
      }

      const response = await axios.get(`${apiUrl}${endpoint}`);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recipes' });
    }
  }

  async getRecipeInfo(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'Recipe ID is required' });
      }

      const apiUrl = `${process.env.API_URL}/lookup.php?i=${id}`;
      const response = await axios.get(apiUrl);

      if (!response.data?.meals) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      res.status(200).json(response.data.meals[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recipe info' });
    }
  }
}

module.exports = new RecipeController();
