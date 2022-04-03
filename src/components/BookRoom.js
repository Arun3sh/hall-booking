import { roomDataFunc } from './roomDataFunc';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

function BookRoom() {
	const history = useHistory();
	const roomData = roomDataFunc();

	return (
		<div className="bookroom-wrapper container-sm">
			{roomData.map(({ id, amentities, seats, price }, index) => (
				<div key={index} className="container-home">
					<h3>
						Room ID: <span className="room-id">{id}</span>
					</h3>
					<p>Seats: {seats}</p>
					<p>Price per hour - {price} </p>
					<h5>Amentities</h5>
					<p>
						{amentities.map(({ chair, table, Wifi, tv }, index) => (
							<span key={index}>
								Chair - {chair}, Table - {table}, Wifi - {Wifi}, TV - {tv}{' '}
							</span>
						))}
					</p>
					<Button variant="outlined" onClick={() => history.push(`/book-room/${id}`)}>
						Book Room
					</Button>
				</div>
			))}
		</div>
	);
}

export default BookRoom;
