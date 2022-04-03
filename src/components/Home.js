import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

function Home() {
	const history = useHistory();

	return (
		<div className="container-sm home-wrapper">
			<div className="other-div" style={{ margin: '20px' }}>
				<Button variant="outlined" onClick={() => history.push('/create-new-room')}>
					Create Room
				</Button>
				<Button variant="outlined" onClick={() => history.push('/book_room')}>
					Book Room
				</Button>
				<Button variant="outlined" onClick={() => history.push('/create-new-room')}>
					View Booked Data by Room
				</Button>
				<Button variant="outlined" onClick={() => history.push('/create-new-room')}>
					View Booked Customers
				</Button>
			</div>
		</div>
	);
}

export default Home;
