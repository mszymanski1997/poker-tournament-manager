import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PokerProvider } from './store/PokerSettings/PokerProvider';
import { TimerProvider } from './store/TimerSettings/TimerProvider';
import Timer from './pages/Timer/Timer';
import Header from './components/shared/Header/Header';

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Header />,
			children: [
				{
					path: '/',
					element: <Timer />,
				},
			],
		},
	],
	{ basename: '/poker-tournament-manager' },
);

function App() {
	return (
		<TimerProvider>
			<PokerProvider>
				<RouterProvider router={router}></RouterProvider>
			</PokerProvider>
		</TimerProvider>
	);
}

export default App;
