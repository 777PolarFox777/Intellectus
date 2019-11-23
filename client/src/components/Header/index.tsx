import * as React from 'react';
import mergeClassNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MAIN_VIEW_TYPES, URLS } from '../../constants';
import { Dispatch, State } from '../../store';
import { MainState } from '../../pages/Main/model';

export interface HeaderProps {
  location: Location;
}

export const Header = (props: HeaderProps): React.ReactElement => {
  const { location: { pathname } } = props;

  const dispatch: Dispatch = useDispatch();

  const isLoading = useSelector<State, boolean>(state => state.loader);
  const { currentView } = useSelector<State, MainState>(state => state.main);

  const shouldRenderNavBar = !isLoading
    && (currentView === MAIN_VIEW_TYPES.intro || pathname !== URLS.main);

  const headerLogoClass = mergeClassNames('header-logo', {
    'border-bottom': currentView !== MAIN_VIEW_TYPES.test && currentView !== MAIN_VIEW_TYPES.watch,
  });

  return (
    <>
      <div className={headerLogoClass}>
        <NavLink
          to={URLS.main}
          onClick={() => dispatch.main.setCurrentView(MAIN_VIEW_TYPES.intro)}
          exact
          aria-label="Main page link"
          className="header-logo-link"
        >
          <img className="header-logo-img" src="images/logo.png" alt="Main Intellectus logo" />
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
            <NavLink
              to={URLS.contactUs}
              onClick={() => dispatch.contactUs.setIsSent({ isFinish: false })}
              exact
            >
              CONTACT US
            </NavLink>
          </h1>
        </nav>
      )}
    </>
  );
};
