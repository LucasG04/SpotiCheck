import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CREDENTIALS } from '../../../../environments/credentials';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  response_type = 'token';
  scope = 'user-top-read';
  show_dialog = 'true';
  proxy = 'https://cors-anywhere.herokuapp.com/';
  redirectUri = environment.redirectUri;

  constructor(private http: HttpClient) { }

  authorization() {
    const client_id = CREDENTIALS.client_id;

    const uurl = 'https://accounts.spotify.com/authorize?client_id=' + client_id + '&response_type=' + this.response_type + '&redirect_uri=' + this.redirectUri + '&scope=' + this.scope + '&show_dialog=' + this.show_dialog;
    window.location.href = uurl;
  }

  getData(token: String, type: String, timeRange: String = 'medium_term', limit: String = '10', offset: String = '0') {
    const url = 'https://api.spotify.com/v1/me/top/' + type.toLowerCase() + '?time_range=' + timeRange + '&limit=' + limit + '&offset=' + offset;

    // HttpHeader to authorize API call
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    // http GET Call to get the top artists/tracks
    return this.http.get(this.proxy + url, httpOptions);
  }
}
