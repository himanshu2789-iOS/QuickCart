import notifee, { AndroidImportance, AuthorizationStatus } from '@notifee/react-native';
import { Platform } from 'react-native';

let channelCreated = false;

export async function requestNotificationPermission() {
  const settings = await notifee.requestPermission();
  return (
    settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
    settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
  );
}

async function ensureAndroidChannel() {
  if (Platform.OS !== 'android' || channelCreated) return 'orders';
  await notifee.createChannel({
    id: 'orders',
    name: 'Order Updates',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });
  channelCreated = true;
  return 'orders';
}

export async function showOrderSuccessNotification(order) {
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) {
    console.warn('Notification permission not granted');
    return;
  }

  const channelId = await ensureAndroidChannel();

  await notifee.displayNotification({
    title: '✅ Order Confirmed',
    body: `Order ${order.id} placed successfully — thank you for shopping!`,
    data: { orderId: order.id, type: 'order_success' },
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: { id: 'default' },
      smallIcon: 'ic_launcher',
    },
    ios: {
      sound: 'default',
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true,
      },
    },
  });
}