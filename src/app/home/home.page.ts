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
          console.log("click " + res);
        });

        this.localNotifications.on('trigger').subscribe(res => {
          console.log("trigger " + res);
        });
      });
    }

  simpleNotification() {
    this.localNotifications.schedule({
      title: 'Simple Notification',
      text: 'Text',
      foreground: true
    });
  }

  relativeNotification() {
    this.localNotifications.schedule({
      title: 'Relative Notification',
      text: 'Text',
      trigger: {
        in: 5, unit: ELocalNotificationTriggerUnit.SECOND
      }
    });
  }

  repeatNotification() {
    this.localNotifications.schedule({
      title: 'Welcome to HAN!',
      trigger: {
        center: [51.987148, 5.951486],
        radius: 15,
        notifyOnEntry: true
    }
    });
  }

  actionNotification() {
    this.localNotifications.schedule({
      title: 'Action Notification',
      text: 'Is this an action?',
      actions: [
        { id: 'yes', title: 'Yes' },
        { id: 'no', title: 'No' }
      ],
      wakeup: true,
      trigger: {
        in: 5, unit: ELocalNotificationTriggerUnit.SECOND
      }
    });
  }

  getAll() {
    this.localNotifications.getAll().then(res => {
      this.scheduled = res;
    });
  }

}
