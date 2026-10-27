import TournamentsTable from './components/TournamentsTable/TournamentsTable';
import { SavedTournamentProvider } from './store/SavedTournamentProvider';

const SavedTournaments = () => {
	return (
		<SavedTournamentProvider>
			<TournamentsTable />
		</SavedTournamentProvider>
	);
};

export default SavedTournaments;
