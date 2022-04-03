import { Switch, Route } from 'react-router-dom';
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import BookRoomForm from './components/BookRoomForm';
import { toast } from 'react-toastify';
import Createroom from './components/Createroom';
import BookRoom from './components/BookRoom';

toast.configure();

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/book_room">
					<BookRoom />
				</Route>
				<Route path="/book-room/:id">
					<BookRoomForm />
				</Route>
				<Route path="/create-new-room">
					<Createroom />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
