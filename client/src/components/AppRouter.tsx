import { Routes, Route } from 'react-router';
import React from 'react';
import { RecipeListPage } from '../pages/RecipeListPage/RecipeListPage';
import { RecipeInfoPage } from '../pages/RecipeInfoPage/RecipeInfoPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RecipeListPage />} />
      <Route path="/recipe/:id" element={<RecipeInfoPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
