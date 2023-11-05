import { useMemo } from 'react';
import type { LoadingButtonProps } from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';

/**
 * MUI Button with default loading styles setup
 * @param {ButtonProps} props
 * @returns {any}
 */
const SlsButton = function SlsButton(props: LoadingButtonProps){

  const buttonProps = useMemo(() => {
    const newProps = { ...props };

    if (props.loading) {
      Object.assign(newProps, {
        loadingPosition: "start",
        startIcon: <SaveIcon />,
        children: 'Loading...',
      });
    }

    return newProps;
  }, [props]);

  return (
    <LoadingButton {...buttonProps} />
  );
}

export default SlsButton;
