import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import './RecipeInfoPage.css';
import { Loader } from '../../components/Loader/Loader';
import { getRecipeInfo, getAllRecipes } from '../../http/recipeApi';

interface RecipeInfo {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  [key: string]: string | null;
}

export const RecipeInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeInfo | null>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<RecipeInfo[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeInfo = async () => {
      try {
        if (id) {
          const data = await getRecipeInfo(id);
          setRecipe(data);
          setError('');
        }
      } catch (error) {
        setError('Ошибка при загрузке рецепта');
      }
    };

    fetchRecipeInfo();
  }, [id]);

  useEffect(() => {
    const fetchRecipesFromCategory = async () => {
      try {
        if (recipe?.strCategory) {
          const data = await getAllRecipes('category', recipe.strCategory);
          setCategoryRecipes(data.meals || []);
          setError('');
        }
      } catch (error) {
        setError('Ошибка при загрузке рецептов категории');
      }
    };

    fetchRecipesFromCategory();
  }, [recipe?.strCategory]);

  const ingredients = useMemo(() => {
    if (!recipe) return [];
    
    const result = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient) result.push(ingredient);
    }
    return result;
  }, [recipe]);

  if (error) {
    return <div className="recipe-info__error">{error}</div>;
  }

  if (!recipe) {
    return <Loader />;
  }

  return (
    <div className="recipe-info">
      <div className="recipe-info__details">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-info__image"
        />
        <h2 className="recipe-info__name">{recipe.strMeal}</h2>
        <p className="recipe-info__country">
          <strong>Country:</strong>{' '}
          <Link
            to={`/?filterType=country&filterValue=${recipe.strArea}`}
            className="recipe-info__link"
          >
            {recipe.strArea}
          </Link>
        </p>
        <p className="recipe-info__section-title">
          <strong>Instructions:</strong>
        </p>
        <p className="recipe-info__instructions">{recipe.strInstructions}</p>
        <p className="recipe-info__section-title">
          <strong>Ingredients:</strong>
        </p>
        <ul className="recipe-info__ingredients">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="recipe-info__ingredient-item">
              <Link
                to={`/?filterType=ingredient&filterValue=${ingredient}`}
                className="recipe-info__link recipe-info__ingredient-link"
              >
                {ingredient}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="recipe-info__sidebar">
        <h3 className="recipe-info__sidebar-title">
          Recipes in {recipe.strCategory}
        </h3>
        <ul className="recipe-info__sidebar-list">
          {categoryRecipes.map((catRecipe) => (
            <li key={catRecipe.idMeal} className="recipe-info__sidebar-item">
              <a
                href="#"
                className="recipe-info__link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/recipe/${catRecipe.idMeal}`);
                }}
              >
                {catRecipe.strMeal}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
