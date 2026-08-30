import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PokerProvider } from './store/PokerSettings/PokerProvider';
import { TimerProvider } from './store/TimerSettings/TimerProvider';
import Timer from './pages/Timer/Timer';
import Navigation from './components/shared/Navigation/Navigation';
import Auth from './pages/Auth/Auth';
import SavedTournaments from './pages/SavedTournaments/SavedTournaments';
import AuthProvider from './store/AuthContext/AuthProvider';

const queryClient = new QueryClient();

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Navigation />,
			children: [
				{
					path: '/',
					element: <Timer />,
				},
				{ path: '/auth', element: <Auth /> },
				{ path: 'saved-tournaments', element: <SavedTournaments /> },
			],
		},
	],
	{ basename: '/poker-tournament-manager' },
);

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<TimerProvider>
					<PokerProvider>
						<RouterProvider router={router}></RouterProvider>
					</PokerProvider>
				</TimerProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
