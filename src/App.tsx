import { ChangeEventHandler, FormEvent, useCallback, useState } from 'react';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import SlsButton from './Slscomponents/SlsButton'


import './App.css'

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
  password: yup.string().min(10).required(),
})

function App() {
  const [formState, setFormState] = useState<LoginFormStateT>({
    userName: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginFormErrorsT>({ ...defaultFormErrors });

  const validateLoginData = useCallback(async (formState: LoginFormStateT) => {
    try {
      await loginFormSchema.validate(formState, { abortEarly: false });
      setErrors({ ...defaultFormErrors });
      
    } catch (err) {
      const formatedErrors = err.inner.reduce((allErrors, curError) => {  
        allErrors[curError.path] = curError.message;
        return allErrors;
      }, { ...defaultFormErrors });

      setErrors(formatedErrors);
    }
  }, []);

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    validateLoginData(formState);
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
        variant="outlined"
        type="submit"
        fullWidth
        sx={{ '&.MuiButton-root': { p: 1 } }}
      >
        Login
      </SlsButton>
    </form>
  )
}

export default App
