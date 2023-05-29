import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './Pages/admins/admins.component';
import { ComputersComponent } from './Pages/computers/computers.component';
import { ConfigsComponent } from './Pages/configs/configs.component';
import { GroupsComponent } from './Pages/groups/groups.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { ReportsComponent } from './Pages/reports/reports.component';
import { ComputerInfoComponent } from './Pages/computers/computer-info/computer-info.component';
import { NewGroupComponent } from './Pages/groups/new-group/new-group.component';
import { GroupEditComponent } from './Pages/groups/group-edit/group-edit.component';
import { NewConfigComponent } from './Pages/configs/new-config/new-config.component';
import { ConfigEditComponent } from './Pages/configs/config-edit/config-edit.component';
import { AdminConfigComponent } from './Pages/admins/admin-config/admin-config.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'Home',
    component: HomeComponent, canActivate: [AuthService]
  },
  {
    path:"Computers",
    component: ComputersComponent, canActivate: [AuthService]
  },
  {
    path:"Groups",
    component: GroupsComponent, canActivate: [AuthService]
  },
  {
    path:"Configs",
    component: ConfigsComponent, canActivate: [AuthService]
  },
  {
    path:"Reports",
    component: ReportsComponent, canActivate: [AuthService]
  },
  {
    path:"Admins",
    component: AdminsComponent, canActivate: [AuthService]
  },
  {
    path:"NewGroup",
    component: NewGroupComponent, canActivate: [AuthService]
  },
  {
    path:"NewConfig",
    component: NewConfigComponent, canActivate: [AuthService]
  },
  { path: 'Admins/:Id', component: AdminConfigComponent, canActivate: [AuthService] },
  { path: 'Computers/:Id', component: ComputerInfoComponent, canActivate: [AuthService]  },
  { path: 'Configs/:Id', component: ConfigEditComponent, canActivate: [AuthService]  },
  { path: 'Groups/:Id', component:GroupEditComponent, canActivate:[AuthService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
