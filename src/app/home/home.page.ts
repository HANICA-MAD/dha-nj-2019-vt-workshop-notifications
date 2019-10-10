import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scheduled = [];

  constructor(private platform: Platform, private localNotifications: LocalNotifications,
    private alertController: AlertController) {
    this.platform.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        let data = res.data ? res.data.data : "";
        this.showAlert(res.title, res.text, data);
      });
    });
  }

  requestPermission() {
    this.localNotifications.requestPermission();
  }

  simpleNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Simple Notification',
      text: 'Text',
      data: { id: 1 },
      foreground: true
    });
  }

  scheduleNotification() {
    this.localNotifications.schedule({
      id: 2,
      title: 'Scheduled Notification',
      text: 'Text',
      trigger: { in: 10, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true
    });
  }

  recurringNotification() {
    this.localNotifications.schedule({
      id: 3,
      title: 'Recurring Notification',
      text: 'Text',
      trigger: {
        every: ELocalNotificationTriggerUnit.SECOND
      }
    });
  }

  cancelNotification() {
    this.localNotifications.cancel(2);
  }

  actionNotification() {
    this.localNotifications.schedule({
      id: 4,
      title: 'Action Notification',
      text: 'Text',
      actions: [
        { id: 'yes', title: 'Yes' },
        { id: 'no', title: 'No' }
      ],
      wakeup: true,
      foreground: true
    });
  }

  getAll() {
    this.localNotifications.getAll().then(res => {
      this.scheduled = res;
    });
  }

  showAlert(header, sub, msg) {
    this.alertController.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ["OK"]
    }).then(alert => alert.present());
  }

}
