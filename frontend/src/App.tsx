import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './Layout';
import { Admin } from './Pages/Admin';
import { PersonalInfo } from './Pages/PersonalInfo';
import { Register } from './Pages/Register';
import { SickLeave } from './Pages/SickLeave';
import { Vacation } from './Pages/Vacation';

function App(): React.ReactElement {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/personalInfo' element={<PersonalInfo />} />
					<Route path='/vacation' element={<Vacation />} />
					<Route path='/sickLeave' element={<SickLeave />} />
					<Route path='/admin' element={<Admin />} />
					<Route path='/' element={<Admin />} />
				</Route>
				<Route path='/register' element={<Register />} />
				{/* <Route path='*' element={<NotFound />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
