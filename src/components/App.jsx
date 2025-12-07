import './App.css';
import { ToastContainer } from 'react-toastify';
import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../redux/auth/operations';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegistrationPage = lazy(() => import('../pages/RegistrationPage'));
const Navigation = lazy(() => import('./Navigation/Navigation'));
const PhonePage = lazy(() => import('../pages/PhonePage'));

import { PrivateRoute } from '../guards/PrivateRoute';
import { RestrictedRoute } from '../guards/RestrictedRoute';
import NotFound from './NotFound/NotFound';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/selectors';

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <div>
      <h1>Phonebook</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route
              index
              element={
                isLoggedIn ? (
                  <div>Welcome back ti HomePage!</div>
                ) : (
                  <div>Please login to access the contacts</div>
                )
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="signup"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<RegistrationPage />}
                />
              }
            />
            <Route
              path="contacts"
              element={
                <PrivateRoute redirectTo="/login" component={<PhonePage />} />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </div>
  );
}

export default App;
