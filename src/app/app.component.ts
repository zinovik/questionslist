import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'questionslist';

  loggedIn: boolean;

  ngOnInit() {
    if (window.location.href.indexOf('access_token=') >= 0) {
      const accessTokenStart = window.location.href.indexOf('access_token=') + 13;
      const accessTokenEnd = window.location.href.indexOf('&', accessTokenStart);
      const accessToken = window.location.href.substring(accessTokenStart, accessTokenEnd);
      console.log(accessToken);
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  googleLogin() {
    const clientId = '1094841489541-toms881mmbi6m04aco86qg0h43pb4iuo.apps.googleusercontent.com';
    const redirectUrl = `https//${window.location.host}/`;
    const loginUrl = `https://accounts.google.com/o/oauth2/auth` +
      `?scope=email profile` +
      `&client_id=${clientId}` +
      `&redirect_uri=${redirectUrl}` +
      `&response_type=token`;
    window.open(loginUrl, '_self', 'location=no');
  }
}
