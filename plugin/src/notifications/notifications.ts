import { Notifications, NotificationType } from '@twilio/flex-ui'

Notifications.registerNotification({
  id: 'workerCreated',
  closeButton: true,
  content: 'The worker was successfully created',
  timeout: 3000,
  type: NotificationType.success
})

Notifications.registerNotification({
  id: 'errorWorkerCreated',
  closeButton: true,
  content: 'An error has ocurred, the worker was not created',
  timeout: 3000,
  type: NotificationType.error
})

Notifications.registerNotification({
  id: 'workerDeleted',
  closeButton: true,
  content: 'The worker was successfully deleted',
  timeout: 3000,
  type: NotificationType.success
})

Notifications.registerNotification({
  id: 'errorWorkerDeleted',
  closeButton: true,
  content: 'An error has ocurred, the worker was not deleted',
  timeout: 3000,
  type: NotificationType.success
})
