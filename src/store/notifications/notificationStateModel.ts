export interface AlertNotificationModel {
  status?: boolean;
  message?: string;
  type?: string;
}


export interface NotificationStateModel {
  alertNotification?: AlertNotificationModel;
}