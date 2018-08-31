import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { OtpverifyPage } from '../otpverify/otpverify';

import * as $ from 'jquery';

@Component({
  selector: 'page-login-new',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  otp: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.otp = Math.floor(Math.random() * Math.floor(99999));
  }

  ionViewDidLoad() {
    console.log('LoginPage', this.otp);
  }

  /*For alert meassage*/
  presentAlert() {
    let alert = this.alertCtrl.create(
      {
        title: 'OTP sent !',
        buttons: ['Dismiss']
      });

    alert.present();
  }

  /*For sending otp to entered phone number*/
  signIn(phoneNumber: Number) {

    let otp = this.otp;

    let data = {
      sender: 'SOCKET',
      route: '4',
      country: '91',
      sms: [{
        message: `${this.otp} is the OTP for your Fury account - ${phoneNumber}.\nHave a pleasent day ! :)`,
        to: [phoneNumber]
      }]
    };

    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://api.msg91.com/api/v2/sendsms",
      "method": "POST",
      "headers": {
        "authkey": "120364AWey9QFL5b8423c6",
        "content-type": "application/json"
      },
      "processData": false,
      "data": JSON.stringify(data)
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
    });

    this.presentAlert();

    this.navCtrl.push(OtpverifyPage, {
      phoneNumber: phoneNumber,
      otp: otp
    });
    return 0;
  }


}
