import { Switch, Route } from 'react-router-dom';
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import BookRoom from './components/BookRoom';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/book-room/:id">
					<BookRoom />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
