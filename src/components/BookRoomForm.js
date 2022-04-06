import './BookRoom.css';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams, useHistory } from 'react-router-dom';
import { API } from './global';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

function BookRoomForm() {
	const history = useHistory();
	const [myRoom, setMyRoom] = useState([]);
	const { id } = useParams();

	const inputstyle = {
		marginTop: '15px',
	};

	const today = new Date();
	const month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
	const date = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;
	const myhrs = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
	const hrs = myhrs > 9 ? myhrs : `0${myhrs}`;

	const time = hrs + ':' + today.getMinutes();
	const todayDate = today.getFullYear() + '-' + month + '-' + date;

	const getBookingData = () => {
		fetch(`${API}/book-room/${id}`, {
			method: 'GET',
		})
			.then((data) => data.json())
			.then((d) => setMyRoom(d));
	};

	useEffect(getBookingData, []);

	const bookRoom = (newData) => {
		newData.id = myRoom.room_id;
		fetch(`${API}/book-room/${id}`, {
			method: 'PUT',
			body: JSON.stringify(newData),
			headers: {
				'Content-type': 'application/json',
			},
		}).then(() => {
			toast.success('room booked');
			history.push('/');
		});
	};

	const formValidationSchema = yup.object({
		name: yup.string().required('Name is Required'),
		date: yup.date().required('Choose a date').min(todayDate),
		from: yup.string().required(),
		to: yup.string().required(),
	});

	const { values, errors, handleSubmit, handleBlur, handleChange, touched } = useFormik({
		initialValues: {
			name: '',
			date: todayDate,
			from: '',
			to: '',
		},
		validationSchema: formValidationSchema,
		onSubmit: (values) => {
			const check = myRoom.booking_details.filter(
				(d) => d.date === values.date && d.to >= values.from
			);
			if (check.length === 0) {
				bookRoom(values);
			} else {
				alert('Room already booked on that date and time');
			}
		},
	});

	return (
		<div className="container-sm bookRoom-wrapper">
			<div className="bookRoom-container">
				<h3>Book Room </h3>
				<form className="bookRoom-form" onSubmit={handleSubmit}>
					<TextField
						id="name"
						name="name"
						variant="outlined"
						autoFocus={true}
						label="Name"
						type="text"
						value={values.name}
						onChange={handleChange}
						onBlur={handleBlur}
						style={inputstyle}
						error={errors.name && touched.name}
						helperText={errors.name && touched.name ? errors.name : ''}
					/>
					<TextField
						id="date"
						name="date"
						variant="outlined"
						// label="Date"
						type="date"
						min={todayDate}
						onChange={handleChange}
						onBlur={handleBlur}
						style={inputstyle}
						error={errors.date && touched.date}
						helperText={errors.date && touched.date ? errors.date : ''}
					/>
					<TextField
						id="from"
						name="from"
						variant="outlined"
						type="time"
						onChange={handleChange}
						onBlur={handleBlur}
						style={inputstyle}
						error={errors.from && touched.from}
						helperText={values.from >= time ? '' : 'Choose current time or greater'}
					/>
					<TextField
						id="to"
						name="to"
						variant="outlined"
						type="time"
						onChange={handleChange}
						onBlur={handleBlur}
						style={inputstyle}
						error={errors.to && touched.to}
						helperText={values.to >= values.from ? '' : 'Choose different time'}
					/>

					<Button type="submit" variant="outlined" style={inputstyle}>
						Book
					</Button>
				</form>
			</div>
		</div>
	);
}

export default BookRoomForm;
