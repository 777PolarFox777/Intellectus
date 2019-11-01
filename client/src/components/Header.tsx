import * as React from 'react';
import mergeClassNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MAIN_VIEW_TYPES, URLS } from '../constants';
import { setCurrentView } from '../pages/Main/actions';
import { State } from '../store';
import { MainState } from '../pages/Main/initialState';
import { LoaderState } from './Loader/initialState';

export interface HeaderProps {
  location: Location;
}

export const Header = (props: HeaderProps): React.ReactElement => {
  const { location: { pathname } } = props;

  const dispatch = useDispatch();

  const { isLoading } = useSelector<State, LoaderState>(state => state.loader);
  const { currentView } = useSelector<State, MainState>(state => state.main);

  const shouldRenderNavBar = !isLoading
    && (currentView === MAIN_VIEW_TYPES.intro || pathname !== URLS.main);

  return (
    <header className="header">
      <div className="header-logo">
        <NavLink
          to={URLS.main}
          onClick={() => dispatch(setCurrentView(MAIN_VIEW_TYPES.intro))}
          exact
          className="header-logo-link"
        >
          <img className="header-logo-img" src="images/logo.png" />
        </NavLink>
      </div>
      {shouldRenderNavBar && (
        <nav className="header-container">
          <h1
            className={mergeClassNames('header-item', {
              active: pathname === URLS.statistics,
            })}
          >
            <NavLink to={URLS.statistics} exact>
              STATISTICS
            </NavLink>
          </h1>
          <h1
            className={mergeClassNames('header-item', {
              active: pathname === URLS.about,
            })}
          >
            <NavLink to={URLS.about} exact>
              ABOUT
            </NavLink>
          </h1>
          <h1
            className={mergeClassNames('header-item', {
              active: pathname === URLS.contactUs,
            })}
          >
            <NavLink to={URLS.contactUs} exact>
              CONTACT US
            </NavLink>
          </h1>
        </nav>
      )}
    </header>
  );
};
