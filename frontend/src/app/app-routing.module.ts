import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StationdetailComponent} from './components/stationdetail/stationdetail.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'bikesdetail/:id', component: StationdetailComponent, pathMatch: 'full'},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
