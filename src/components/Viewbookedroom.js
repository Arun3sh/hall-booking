import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { API } from './global';

function Viewbookedroom() {
	const [roomData, setRoomData] = useState([]);
	const [id, setId] = useState();
	const getroomData = () => {
		fetch(`${API}/rooms`, {
			method: 'GET',
		})
			.then((data) => data.json())
			.then((data) => setRoomData(data));
	};
	useEffect(getroomData, []);

	const [activeTab, setActiveTab] = useState();
	const handleChange = (index) => {
		setActiveTab(index);
	};

	return (
		<div className="viewbookedroom-wrapper container-sm">
			<div className="viewbookedroom-container">
				{roomData.map(({ room_id, _id }, index) => (
					<Button
						key={index}
						variant="outlined"
						className={index === activeTab ? 'active' : 'notactive'}
						onClick={() => setId(_id) & handleChange(index)}
					>
						{room_id}
					</Button>
				))}
			</div>
			<div className="room-status-container">
				{id === undefined ? 'Please select a Room' : <GetBookingDetails id={id} />}
			</div>
		</div>
	);
}

function GetBookingDetails({ id }) {
	const [useData, setUseData] = useState([]);
	const getroomData = () => {
		fetch(`${API}/book-room/${id}`, {
			method: 'GET',
		})
			.then((data) => data.json())
			.then((data) => setUseData(data.booking_details));
	};
	useEffect(getroomData, [id]);

	return (
		<div className="booking-details-container">
			{useData.map((e) => (
				<div className="booking-details">
					<h6 className="cx-name">{e.name}</h6>
					<p className="date-booking">
						{e.date} <span>From: {e.from} </span> - <span>To: {e.to} </span>
					</p>
				</div>
			))}
		</div>
	);
}

export default Viewbookedroom;
