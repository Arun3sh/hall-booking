import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { API } from './global';
import { toast } from 'react-toastify';

function Createroom() {
	const inputstyle = {
		marginTop: '15px',
	};

	const createNewRoom = (newRoomData) => {
		newRoomData.booking_details = [];
		fetch(`${API}/create-new-room`, {
			method: 'POST',
			body: JSON.stringify(newRoomData),
			headers: {
				'Content-type': 'application/json',
			},
		}).then(() => {
			toast.success('New Room Added');
		});
	};

	const formValidationSchema = yup.object({
		room_id: yup.string().required('Room Id is required'),
		seat: yup.number().required().min(2),
		chair: yup.number().required().min(2),
		table: yup.number().required().min(1),
		wifi: yup.string().required(),
		tv: yup.string().required(),
		price: yup.number().required().min(100),
	});

	const { values, errors, handleSubmit, handleChange, handleBlur, touched } = useFormik({
		initialValues: {
			room_id: '',
			seat: '',
			chair: '',
			table: '',
			wifi: '',
			tv: 'yes',
			price: 'yes',
		},
		validationSchema: formValidationSchema,
		onSubmit: (values) => {
			createNewRoom(values);
			console.log(values);
		},
	});

	return (
		<div className="container-sm createRoom-wrapper">
			<div className="createRoom-container">
				<h3>Create New Room</h3>
				<form className="createRoom-form" onSubmit={handleSubmit}>
					<TextField
						id="room_id"
						name="room_id"
						variant="outlined"
						autoFocus={true}
						label="Room ID"
						type="text"
						onBlur={handleBlur}
						onChange={handleChange}
						style={inputstyle}
						error={errors.room_id && touched.room_id}
						helperText={errors.room_id && touched.room_id ? errors.room_id : ''}
					/>

					<TextField
						id="seat"
						name="seat"
						variant="outlined"
						label="Seats Available"
						type="text"
						onBlur={handleBlur}
						onChange={handleChange}
						style={inputstyle}
						error={errors.seat && touched.seat}
						helperText={errors.seat && touched.seat ? errors.seat : ''}
					/>

					<TextField
						id="chair"
						name="chair"
						variant="outlined"
						label="Chairs Available"
						type="text"
						onBlur={handleBlur}
						onChange={handleChange}
						style={inputstyle}
						error={errors.chair && touched.chair}
						helperText={errors.chair && touched.chair ? errors.chair : ''}
					/>

					<TextField
						id="table"
						name="table"
						variant="outlined"
						label="Table Qty"
						type="text"
						onBlur={handleBlur}
						onChange={handleChange}
						style={inputstyle}
						error={errors.table && touched.table}
						helperText={errors.table && touched.table ? errors.table : ''}
					/>

					<FormLabel style={inputstyle} id="wifi-available-status">
						Wifi Available? *
					</FormLabel>
					<RadioGroup
						onChange={handleChange}
						row
						aria-labelledby="wifi-available-status"
						id="wifi"
						name="wifi"
					>
						<FormControlLabel id="wifi" name="wifi" value="yes" control={<Radio />} label="yes" />
						<FormControlLabel id="wifi" name="wifi" value="no" control={<Radio />} label="no" />
					</RadioGroup>

					<FormLabel style={inputstyle} id="tv-available-status">
						TV Available? *
					</FormLabel>
					<RadioGroup
						onChange={handleChange}
						row
						aria-labelledby="tv-available-status"
						id="tv"
						name="tv"
					>
						<FormControlLabel id="tv" name="tv" value="yes" control={<Radio />} label="yes" />
						<FormControlLabel id="tv" name="tv" value="no" control={<Radio />} label="no" />
					</RadioGroup>

					<TextField
						id="price"
						name="price"
						variant="outlined"
						label="Price Per Hour"
						type="text"
						onBlur={handleBlur}
						onChange={handleChange}
						style={inputstyle}
						error={errors.price && touched.price}
						helperText={errors.price && touched.price ? errors.price : ''}
					/>

					<Button style={inputstyle} variant="outlined" type="submit">
						Create Room
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Createroom;
