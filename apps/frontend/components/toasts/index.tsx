import InfoToast from './InfoToast';
import SuccessToast from './SuccessToast';

const toastConfig = {
  success: (props: any) => <SuccessToast {...props} />,
  error: (props: any) => <SuccessToast {...props} />,
  info: (props: any) => <InfoToast {...props} />,
};

export default toastConfig;
