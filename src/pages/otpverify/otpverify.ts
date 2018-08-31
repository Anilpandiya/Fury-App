import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-otpverify',
  templateUrl: 'otpverify.html',
})

export class OtpverifyPage {

  phoneNumber: Number;
  otp: Number;
  user_otp: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.phoneNumber = navParams.get('phoneNumber');
    this.otp = navParams.get('otp');
  }

  ionViewDidLoad() {
    console.log('OTPverifyPage PhNo: ', this.phoneNumber, 'Otp :', this.otp);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'InValid OTP !',
      subTitle: 'Please Enter correct one.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  verifyOtp(user_otp) {
    if (user_otp == this.otp) { this.navCtrl.push(TabsPage); }
    else {
      this.presentAlert();
    }
    return 0;
  }
}
