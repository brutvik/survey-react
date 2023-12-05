// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Survey from "./survery";
import UserList from "./userList";
import Home from "./home";


function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Survey />} />
					<Route path="/userList" element={<UserList />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
