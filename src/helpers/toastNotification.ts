import { toast } from 'react-hot-toast';

export const toastNotification = (notificationType: 'success' | 'error', message: string) => {
  toast[notificationType](message);
};
