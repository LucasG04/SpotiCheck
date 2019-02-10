import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'SpotiCheck';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  authorization() {
    this.apiService.authorization();
  }

}
