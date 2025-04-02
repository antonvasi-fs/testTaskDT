import { useNavigate } from 'react-router';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <button onClick={() => navigate('/')}>Вернуться на главную</button>
    </div>
  );
};
