import { toast } from 'react-toastify';

const toastPosition = 'top-right';
const toastTimeout = 2000;

const toastInfo = (message) => {
  toast.info(message, {
    type: 'info',
    position: toastPosition,
    autoClose: toastTimeout,
    closeOnClick: true,
  });
};

export default {
  toastInfo,
};
