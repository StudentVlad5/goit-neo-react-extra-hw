import { NavLink, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import css from './Navigation.module.css';

import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaAddressBook,
} from 'react-icons/fa';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={css.layout}>
      <header className={css.header}>
        <div className={css.containerWrap}>
          <nav>
            <ul className={css.menuList}>
              <li className={css.menuItem}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${css.navLink} ${isActive ? css.active : ''}`
                  }
                >
                  <FaHome className={css.icon} />
                  <span>Home</span>
                </NavLink>
              </li>

              {isLoggedIn ? (
                <>
                  <li className={css.menuItem}>
                    <NavLink
                      to="/contacts"
                      className={({ isActive }) =>
                        `${css.navLink} ${isActive ? css.active : ''}`
                      }
                    >
                      <FaAddressBook className={css.icon} />
                      <span>Contacts</span>
                    </NavLink>
                  </li>
                  <li className={css.menuItem}>
                    <button
                      type="button"
                      className={css.navLink}
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className={css.icon} />
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className={css.menuItem}>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `${css.navLink} ${isActive ? css.active : ''}`
                      }
                    >
                      <FaSignInAlt className={css.icon} />
                      <span>Login</span>
                    </NavLink>
                  </li>
                  <li className={css.menuItem}>
                    <NavLink
                      to="/signup"
                      className={({ isActive }) =>
                        `${css.navLink} ${isActive ? css.active : ''}`
                      }
                    >
                      <FaUserPlus className={css.icon} />
                      <span>Registration</span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Navigation;
