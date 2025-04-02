import React, { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router';
import './RecipeListPage.css';
import { getAllRecipes } from '../../http/recipeApi';
import { Loader } from '../../components/Loader/Loader';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export const RecipeListPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get('filterType');
  const filterValue = searchParams.get('filterValue');

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllRecipes(filterType, filterValue);
      setRecipes(data.meals || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recipes');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, [filterType, filterValue]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const getTitle = () => {
    if (filterType && filterValue) {
      return `Recipes filtered by ${filterType}: ${filterValue}`;
    }
    return 'All Recipes';
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="recipe-list-page__error">Error: {error}</div>;
  }

  return (
    <div className="recipe-list-page">
      <h2 className="recipe-list-page__title">{getTitle()}</h2>
      {recipes.length === 0 ? (
        <p className="recipe-list-page__empty">No recipes found</p>
      ) : (
        <ul className="recipe-list-page__list">
          {recipes.map((recipe) => (
            <li key={recipe.idMeal} className="recipe-list-page__item">
              <Link
                to={`/recipe/${recipe.idMeal}`}
                className="recipe-list-page__link"
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  width="100"
                  height="100"
                  loading="lazy"
                  className="recipe-list-page__image"
                />
                <p className="recipe-list-page__name">{recipe.strMeal}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
