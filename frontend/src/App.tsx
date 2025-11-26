import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Timer from './pages/Timer/Timer';
import TableSettings from './pages/Table Settings/TableSettings';
import TournametSettings from './pages/Tournamet Settings/TournamentSettings';
import Auth from './pages/Auth/Auth';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigation />,
		children: [
			{
				path: '/',
				element: <Timer />,
			},
			{
				path: 'table-settings',
				element: <TableSettings />,
			},
			{
				path: 'tournament-settings',
				element: <TournametSettings />,
			},
			{
				path: 'auth',
				element: <Auth />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
