import routes from './routes';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function App() {
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const routing = useRoutes(routes(loggedUser));

  return (
    <>
      {routing}
    </>
  );
}