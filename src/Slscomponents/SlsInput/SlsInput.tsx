import type { TextFieldProps } from '@mui/material/TextField';
import type { AnySchema, ValidationError } from 'yup';
import * as yup from 'yup';
import { useState, useMemo, useCallback, ChangeEventHandler } from 'react';
import TextField from '@mui/material/TextField';

/**
 * MUI Input with auto-error handling by yup schema
 * @param {TextFieldProps} props an object containing MUI TextFieldProps & yup schema
 * @returns {any}
 */

type SlsInputProps = TextFieldProps & {
  schema: AnySchema,
}

const defaultSchema = yup.string().defined();

const SlsInput = function SlsInput(props: SlsInputProps){
  const { onChange, schema = defaultSchema } = props;

  const [value, setValue] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(async (e) => {
    setValue(e.currentTarget.value);
    onChange?.(e);

    try {
      await schema.validate(e.currentTarget.value);
      setErrors([]);
    } catch (err) {
      setErrors((err as ValidationError).errors);
    }

  }, [onChange, schema]);

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

export default SlsInput;
