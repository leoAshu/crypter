import SuccessToast from './SuccessToast';

const toastConfig = {
  success: (props: any) => <SuccessToast {...props} />,
  error: (props: any) => <SuccessToast {...props} />,
};

export default toastConfig;
