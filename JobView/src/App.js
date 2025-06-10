import logo from './logo.svg';
import './App.css';
import React, { Suspense, lazy } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserRoute from './components/UserRoute';
import NotFound from './pages/NotFound';
import Layout from './pages/globals/Layout';
import { ProSidebarProvider } from 'react-pro-sidebar';

const Home = lazy(() => import('./pages/Home'));
const Singleuser = lazy(() => import('./pages/Singleuser'));
const Login = lazy(() => import('./pages/Login'));
const UserDashboard = lazy(() => import('./pages/UserPages/UserDashboard'));
const UserJobs = lazy(() => import('./pages/UserPages/UserJobs'));
const UserInfo = lazy(() => import('./pages/UserPages/UserInfo'));
const AdminJobs = lazy(() => import('./pages/globals/Admin/AdminJobs'));
const AdminUser = lazy(() => import('./pages/globals/Admin/AdminUser'));
const AdminDashboard = lazy(() => import('./pages/globals/Admin/AdminDashboard'));
const UserDashBoardHOC = Layout(UserDashboard);
const UserInfoHOC = Layout(UserInfo);
const UserJobsHOC = Layout(UserJobs);

const AdminJobsHOC = Layout(AdminJobs);
const AdminUsersHOC = Layout(AdminUser);
const AdminDashboardHOC = Layout(AdminDashboard);
function App() {

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <ProSidebarProvider>
        <BrowserRouter>
          <Suspense fallback={<div>loading....</div>}>
            <Routes>
              <Route path='*' element={<NotFound />}></Route>
              <Route path='/' element={<Home />}></Route>
              <Route path='/singleUser' element={<Singleuser />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/search/:location' element={<Home></Home>}></Route>
              {/* user */}
              <Route path='/user/dashboard' element={<UserRoute><UserDashBoardHOC></UserDashBoardHOC></UserRoute>}></Route>
              <Route path='/user/jobs' element={<UserRoute><UserJobsHOC></UserJobsHOC></UserRoute>}></Route>
              <Route path='/user/info' element={<UserRoute><UserInfoHOC></UserInfoHOC></UserRoute>}></Route>

              {/* admin */}
              <Route path='/admin/dashboard' element={<UserRoute><AdminDashboardHOC></AdminDashboardHOC></UserRoute>}></Route>
              <Route path='/admin/users' element={<UserRoute><AdminUsersHOC></AdminUsersHOC></UserRoute>}></Route>
              <Route path='/admin/dashboard' element={<UserRoute><AdminUsersHOC></AdminUsersHOC></UserRoute>}></Route>
              <Route path='/admin/jobs' element={<UserRoute><AdminJobsHOC></AdminJobsHOC></UserRoute>}></Route>

            </Routes>
          </Suspense>
        </BrowserRouter>
      </ProSidebarProvider>
    </ThemeProvider >


  );
}

export default App;
