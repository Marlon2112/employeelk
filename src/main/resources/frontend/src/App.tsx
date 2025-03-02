import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import './App.css';
import { PersonalInfo } from './Pages/PersonalInfo';
import { Register } from './Pages/Register';
import { Vacation } from './Pages/Vacation';
import { SickLeave } from './Pages/SickLeave';
import { Admin } from './Pages/Admin';

function App(): React.ReactElement {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/personalInfo' element={<PersonalInfo />} />
					<Route path='/vacation' element={<Vacation />} />
					<Route path='/sickLeave' element={<SickLeave />} />
					<Route path='/admin' element={<Admin />} />
				</Route>
				<Route path='/register' element={<Register />} />
				{/* <Route path='*' element={<NotFound />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
