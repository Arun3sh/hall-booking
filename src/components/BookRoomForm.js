import './BookRoom.css';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { API } from './global';
import { toast } from 'react-toastify';

function BookRoomForm() {
	const { id } = useParams();
	const inputstyle = {
		marginTop: '15px',
	};

	const today = new Date();
	const month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
	const date = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;
	const myhrs = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
	const hrs = myhrs > 9 ? myhrs : `0${myhrs}`;
	const ampm = today.getHours() > 12 ? 'PM' : 'AM';
	const time = hrs + ':' + today.getMinutes();
	const todayDate = today.getFullYear() + '-' + month + '-' + date;

	// // To set time limit for to
	// const toTimeHrs = today.getHours() + 1 > 12 ? today.getHours() - 12 : today.getHours() + 1;
	// const timeHrs = toTimeHrs > 9 ? toTimeHrs : `0${toTimeHrs}`;
	// const to = timeHrs + ':' + today.getMinutes();

	const bookRoom = (newData) => {
		newData.id = id;
		fetch(`${API}/book-room/${id}`, {
			method: 'PUT',
			body: JSON.stringify(newData),
			headers: {
				'Content-type': 'application/json',
			},
		}).then(() => {
			toast.success('room booked');
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
			bookRoom(values);
			console.log(values);
		},
	});

	return (
		<div className="container-sm bookRoom-wrapper">
			<div className="bookRoom-container">
				<h3>Book Room {id}</h3>
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
