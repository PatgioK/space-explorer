import React from 'react';
import styled from 'react-emotion';
import {useApolloClient} from '@apollo/client';

import {menuItemClassName} from '../components/menu-item';
import {isLoggedInVar} from '../cache';
import {ReactComponent as ExitIcon} from '../assets/icons/exit.svg';

const LogoutButton = () => {
  const client = useApolloClient();
  return (
    <StyledButton
      data-testid="logout-button"
      // //    logout logic      // //
      onClick={() => {
        // Evict and garbage-collect the cached user object

        // It uses the evict and gc methods to purge the Query.me field from our in-memory cache. 
        // This field includes data that's specific to the logged-in user, all of which should be removed on logout.
        client.cache.evict({fieldName: 'me'});
        client.cache.gc();
        
        // Remove user details from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        
        // Set the logged-in status to false
        // When the reactive variable's value changes, that change is automatically broadcast to every query that depends on the variable's value 
        // (specifically, the IS_LOGGED_IN query we defined earlier).
        isLoggedInVar(false);
      }}
    >
      <ExitIcon />
      Logout
    </StyledButton>
  );
};

export default LogoutButton;

const StyledButton = styled('button')(menuItemClassName, {
  background: 'none',
  border: 'none',
  padding: 0
});