import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { StatsComponent } from "./stats/stats.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'stats', component: StatsComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [],
  imports: [ 
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
