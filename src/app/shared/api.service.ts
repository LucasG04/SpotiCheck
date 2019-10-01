import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CREDENTIALS } from '../../environments/credentials';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  authorization() {
    const client_id = CREDENTIALS.client_id;
    const response_type = 'token';
    //const redirect_uri = 'http://localhost:4200/stats';
    const redirect_uri = 'https://spoticheck.me/stats';
    const scope = 'user-top-read';
    const show_dialog = 'true';

    const uurl = 'https://accounts.spotify.com/authorize?client_id='+ client_id+'&response_type='+response_type+'&redirect_uri='+redirect_uri+'&scope='+ scope+'&show_dialog='+show_dialog;
    window.location.href = uurl;
  }

  getData(token: String, type: String, timeRange: String = 'medium_term', limit: String = '10', offset: String = '0') {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://api.spotify.com/v1/me/top/'+type.toLowerCase() + '?time_range=' + timeRange + '&limit=' + limit + '&offset=' + offset;

    // HttpHeader to authorize API call
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    // http GET Call to get the top artists/tracks
    return this.http.get(proxy + url, httpOptions);
  }
}
