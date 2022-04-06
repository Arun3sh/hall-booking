import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { API } from './global';

function Viewbookedcustomer() {
	const [cxData, setCxData] = useState([]);
	const [id, setId] = useState();
	const getroomData = () => {
		fetch(`${API}/get-user`, {
			method: 'GET',
		})
			.then((data) => data.json())
			.then((data) => setCxData(data));
	};
	useEffect(getroomData, []);

	const [activeTab, setActiveTab] = useState();
	const handleChange = (index) => {
		setActiveTab(index);
	};

	return (
		<div className="viewbookedroom-wrapper container-sm">
			<div className="viewbookedroom-container">
				{cxData.map(({ name, _id }, index) => (
					<Button
						key={index}
						variant="outlined"
						className={index === activeTab ? 'active' : 'notactive'}
						onClick={() => setId(_id) & handleChange(index)}
					>
						{name}
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
		fetch(`${API}/get-user-booking/${id}`, {
			method: 'GET',
		})
			.then((data) => data.json())
			.then((data) => setUseData(data[0].booking_details));
	};
	useEffect(getroomData, [id]);

	return (
		<div className="booking-details-container">
			{useData.map((e) => (
				<div className="booking-details">
					{console.log(e)}
					<h6 className="cx-name">{e.room_id}</h6>
					<p className="date-booking">
						{e.date} <span>From: {e.from} </span> - <span>To: {e.to} </span>
					</p>
				</div>
			))}
		</div>
	);
}

export default Viewbookedcustomer;
