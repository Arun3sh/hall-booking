import { roomDataFunc } from './roomDataFunc';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { API } from './global';
import { useEffect, useState } from 'react';

function BookRoom() {
	const history = useHistory();
	const [roomData, setRoomData] = useState([]);
	const getroomData = () => {
		fetch(`${API}/rooms`, {
			method: 'GET',
		})
			.then((data) => data.json())
			.then((data) => setRoomData(data));
	};
	useEffect(getroomData, []);

	return (
		<div className="bookroom-wrapper container-sm">
			<h5>All Rooms</h5>
			{roomData.map(({ _id, room_id, chair, table, wifi, tv, seats, price }, index) => (
				<div key={index} className="container-home">
					<h3>
						Room ID: <span className="room-id">{room_id}</span>
					</h3>
					<p>Seats: {seats}</p>
					<p>Price per hour - {price} </p>
					<h5>Amentities</h5>
					<p>
						<span>
							Chair - {chair}, Table - {table}, Wifi - {wifi}, TV - {tv}{' '}
						</span>
					</p>
					<Button variant="outlined" onClick={() => history.push(`/book-room/${_id}`)}>
						Book Room
					</Button>
				</div>
			))}
		</div>
	);
}

export default BookRoom;
