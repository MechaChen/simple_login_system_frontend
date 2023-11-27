import { ChangeEventHandler, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import ManualButton from '../../manualComponents/ManualButton'
import { useDispatch, useSelector } from '../../utils/myReactRedux';
import { actions } from '../../main';


type LoginFormStateT = {
  userName: string,
  password: string,
};

type LoginFormErrorsT = {
  userName: string,
  password: string,
};

// constants
const defaultFormErrors: LoginFormErrorsT = {
  userName: '',
  password: '',
};

const loginFormSchema = yup.object({
  userName: yup.string().required(),
  password: yup.string().min(6).required(),
});


// funtions
const formatYupErrors = (err: ValidationError) => {
  return err.inner.reduce((allErrors, curError) => {
    allErrors[curError.path as keyof LoginFormStateT] = curError.message;
    return allErrors;
  }, { ...defaultFormErrors });
};

const mockApiLogin = (formState: LoginFormStateT) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (formState.userName !== 'mockUserName' || formState.password !== 'mockPassword') {
      reject(new Error('Unauthorized username & password'));
    }

    resolve(undefined);
  }, 3000);
});


// Component
const LoginForm = function LoginForm() {
  const [formState, setFormState] = useState<LoginFormStateT>({
    userName: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginFormErrorsT>({ ...defaultFormErrors });
  const [authError, setAuthError] = useState('');
  const [isLogging, setIsLogging] = useState(false);

  const errorTypeMap = useMemo(() => ({
    schema: {
      error: ValidationError,
      setError: (err: Error | ValidationError) => {
        const formatedErrors = formatYupErrors(err as ValidationError);
        setErrors(formatedErrors);
      }
    },
    auth: {
      error: Error,
      setError: (err: Error | ValidationError) => {
        setAuthError(err.message);
      }
    }
  }), []);

  const validateLoginData = useCallback(async (formState: LoginFormStateT) => {
    await loginFormSchema.validate(
      formState, { abortEarly: false }
    );
    setErrors({ ...defaultFormErrors }); // clear error
  }, []);

  const handleSubmitErrors = useCallback((err: unknown) => {
    for (const errorType in errorTypeMap) {
      const errorTypeInfo = errorTypeMap[errorType as keyof typeof errorTypeMap];

      if (err instanceof errorTypeInfo.error) {
        errorTypeInfo.setError(err);
        break;
      }
    }
  }, [errorTypeMap]);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    
    try {
      await validateLoginData(formState);

      setIsLogging(true);
      await mockApiLogin(formState);

      const curDate = new Date();
      const oneHourTokenValidTime = curDate.setHours(curDate.getHours() + 12);

      dispatch({
        type: actions.SET_AUTH_DATA,
        payload: oneHourTokenValidTime,
      });

      dispatch({
        type: actions.REDIRECT_PAGE,
        payload: 'MAIN',
      });

      setAuthError('');

    } catch (err) {
      handleSubmitErrors(err);

    } finally {
      setIsLogging(false);
    }
  }, [
    dispatch,
    formState,
    validateLoginData,
    handleSubmitErrors,
  ]);

  const tokenData = useSelector((state) => state.tokenData);

  useEffect(() => {
    console.log('tokenData =>', tokenData);
  }, [tokenData]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  }, [formState]);

  return (
    <form onSubmit={handleSubmit}>
      <Box pb={6} width={450}>
        <TextField
          sx={{ '&.MuiTextField-root': { pb: 4 } }}
          name="userName"
          fullWidth
          placeholder="User Name"
          onChange={handleInputChange}
          value={formState.userName}
          error={errors.userName.length > 0}
          helperText={errors.userName}
        />
        <TextField
          sx={{ '&.MuiTextField-root': { pb: 4 } }}
          name="password"
          fullWidth
          placeholder="Password"
          onChange={handleInputChange}
          value={formState.password}
          error={errors.password.length > 0}
          helperText={errors.password}
        />
      </Box>
      <ManualButton
        sx={{ '&.MuiButton-root': { p: 1, mb: 2 } }}
        variant="outlined"
        type="submit"
        fullWidth
        loading={isLogging}
      >
        Login
      </ManualButton>
      {authError && (
        <Alert severity="error">
          {authError}
        </Alert>
      )}
    </form>
  )
}

export default LoginForm;
