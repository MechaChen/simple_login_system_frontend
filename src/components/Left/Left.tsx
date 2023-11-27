import { useCallback, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useDispatch, useSelector } from '../../utils/myReactRedux';
import { ROUTES, RootStateT, actions } from '../../main';

import './Left.css';

function Left() {
  const tokenExpiredAt = useSelector((state: RootStateT) => state.authData.tokenExpiredAt);

  const isTokenValid = useMemo(() => (
    tokenExpiredAt && new Date(tokenExpiredAt) > new Date()
  ), [tokenExpiredAt]);

  const dispatch = useDispatch();

  const redirectPage = useCallback((route: ROUTES) => {
    dispatch({
      type: actions.REDIRECT_PAGE,
      payload: route,
    });
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch({
      type: actions.REMOVE_AUTH_DATA
    });

    dispatch({
      type: actions.REDIRECT_PAGE,
      payload: 'LOGIN',
    });
  }, [dispatch]);

  return (
    <div className="Left">
      <Box height={20} />
      <Stack
        spacing={2}
        height="calc(100% - 20px)"
        width="90%"
      >
        <Button
          variant='outlined'
          onClick={() => redirectPage('HOME')}
          size="large"
        >
          Home
        </Button>
        {isTokenValid ? (
          <Button
            variant='outlined'
            onClick={() => redirectPage('MAIN')}
            size="large"
          >
            Main
          </Button>
        )
        : (
          <Button
            variant='outlined'
            onClick={() => redirectPage('LOGIN')}
            size="large"
          >
            Login
          </Button>
        )}
       {isTokenValid && (
          <Button
            variant='outlined'
            onClick={logout}
            size="large"
            sx={{
              '&&' : {
                marginTop: 'auto',
                marginBottom: '20px',
              }
            }}
          >
            Logout
          </Button>
        )}
      </Stack>
    </div>
  );
}

export default Left;
