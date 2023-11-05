import { ChangeEventHandler, FormEvent, useCallback, useState } from 'react';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import SlsButton from '../../Slscomponents/SlsButton'


type LoginFormStateT = {
  userName: string,
  password: string,
}

type LoginFormErrorsT = {
  userName: Array<string>,
  password: Array<string>,
}

const defaultFormErrors: LoginFormErrorsT = {
  userName: [],
  password: [],
}

const loginFormSchema = yup.object({
  userName: yup.string().required(),
  password: yup.string().min(6).required(),
})

const formatYupErrors = (err) => {
  return err.inner.reduce((allErrors, curError) => {  
    allErrors[curError.path] = curError.message;
    return allErrors;
  }, { ...defaultFormErrors });
}

const mockApiLogin = (formState: LoginFormStateT) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (formState.userName !== 'mockUserName' || formState.password !== 'mockPassword') {
      reject(new Error('Unauthorized username & password'));
    }

    resolve(undefined);
  }, 3000);
})

const LoginForm = function LoginForm() {
  const [formState, setFormState] = useState<LoginFormStateT>({
    userName: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginFormErrorsT>({ ...defaultFormErrors });
  const [authError, setAuthError] = useState('');
  const [isLogging, setIsLogging] = useState(false);

  const validateLoginData = useCallback(async (formState: LoginFormStateT) => {
    await loginFormSchema.validate(
      formState, { abortEarly: false }
    );
    setErrors({ ...defaultFormErrors });
  }, []);

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    
    try {
      await validateLoginData(formState);

      setIsLogging(true);
      await mockApiLogin(formState);
      setAuthError('');

    } catch (err) {
      if ('errors' in err) {
        const formatedErrors = formatYupErrors(err);
        setErrors(formatedErrors);
      }

      if ('message' in err) {
        setAuthError(err.message);
      }
    } finally {
      setIsLogging(false);
    }
  }, [formState, validateLoginData]);

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
      <SlsButton
        loading={isLogging}
        variant="outlined"
        type="submit"
        fullWidth
        sx={{ '&.MuiButton-root': { p: 1, mb: 2 } }}
      >
        Login
      </SlsButton>
      {authError && (
        <Alert severity="error">{authError}</Alert>
      )}
    </form>
  )
}

export default LoginForm;
