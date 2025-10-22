import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './Layout';
import { Admin } from './Pages/Admin';
import { ADMIN_PAGE_PATH } from './Pages/Admin/Path';
import { CareerRoutes } from './Pages/CareerRoutes';
import { CAREER_ROUTES_PAGE_PATH } from './Pages/CareerRoutes/Path';
import { PersonalInfo } from './Pages/PersonalInfo';
import { PERSONAL_INFO_PAGE_PATH } from './Pages/PersonalInfo/Path';
import { Register } from './Pages/Register';
import { REGISTER_PAGE_PATH } from './Pages/Register/Path';
import { Vacation } from './Pages/Vacation';
import { VACATION_PAGE_PATH } from './Pages/Vacation/Path';

function App(): React.ReactElement {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path={PERSONAL_INFO_PAGE_PATH} element={<PersonalInfo />} />
					<Route path={VACATION_PAGE_PATH} element={<Vacation />} />
					<Route path={CAREER_ROUTES_PAGE_PATH} element={<CareerRoutes />} />
					<Route path={ADMIN_PAGE_PATH} element={<Admin />} />
				</Route>
				<Route path='/' element={<Register />} />
				<Route path={REGISTER_PAGE_PATH} element={<Register />} />
				{/* <Route path='*' element={<NotFound />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
