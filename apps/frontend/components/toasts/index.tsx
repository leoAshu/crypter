import ErrorToast from './ErrorToast';
import InfoToast from './InfoToast';
import SuccessToast from './SuccessToast';

const toastConfig = {
  success: (props: any) => <SuccessToast {...props} />,
  error: (props: any) => <ErrorToast {...props} />,
  info: (props: any) => <InfoToast {...props} />,
};

export default toastConfig;
