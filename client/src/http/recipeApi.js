export const getAllRecipes = async (filterType, filterValue) => {
  const query =
    filterType && filterValue
      ? `?filterType=${filterType}&filterValue=${filterValue}`
      : '';
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/recipe${query}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return response.json();
};

export const getRecipeInfo = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/recipe/info/${id}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch recipe info');
  }
  return response.json();
};
