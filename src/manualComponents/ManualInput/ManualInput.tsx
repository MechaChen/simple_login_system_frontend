import type { TextFieldProps } from '@mui/material/TextField';
import { useState, useMemo, useCallback, ChangeEventHandler } from 'react';
import TextField from '@mui/material/TextField';

type ManualInputProps = Omit<TextFieldProps, 'error' | 'helperText'> & {
  errors: Array<string>,
}

/**
 * MUI Input with auto-error style
 * @param {TextFieldProps} props an object containing MUI TextFieldProps & yup schema
 * @returns {any}
 */
const ManualInput = function ManualInput(props: ManualInputProps){
  const { onChange, errors } = props;

  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(async (e) => {
    setValue(e.currentTarget.value);
    onChange?.(e);
  }, [onChange]);

  const textFieldProps = useMemo(() => {
    const newProps = { ...props };

    Object.assign(newProps, {
      value,
      onChange: handleChange,
      error: errors.length > 0,
      helperText: errors[0],
    });

    return newProps;
  }, [props, handleChange, errors, value]);

  return (
    <TextField {...textFieldProps} />
  );
}

export default ManualInput;
