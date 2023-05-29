import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { ComputersComponent } from './Pages/computers/computers.component';
import { GroupsComponent } from './Pages/groups/groups.component';
import { ConfigsComponent } from './Pages/configs/configs.component';
import { ReportsComponent } from './Pages/reports/reports.component';
import { AdminsComponent } from './Pages/admins/admins.component';
import { ComputerInfoComponent } from './Pages/computers/computer-info/computer-info.component';
import { NewGroupComponent } from './Pages/groups/new-group/new-group.component';
import { GroupEditComponent } from './Pages/groups/group-edit/group-edit.component';
import { NewConfigComponent } from './Pages/configs/new-config/new-config.component';
import { ConfigEditComponent } from './Pages/configs/config-edit/config-edit.component';
import { AdminConfigComponent } from './Pages/admins/admin-config/admin-config.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './Components/menu/menu.component';
import { TopBarComponent } from './Components/top-bar/top-bar.component';
import { Table1Component } from './Components/Home_Components/table1/table1.component';
import { Table2Component } from './Components/Home_Components/table2/table2.component';
import { Table3Component } from './Components/Home_Components/table3/table3.component';
import { SummaryComponent } from './Components/Home_Components/summary/summary.component';
import { FormsModule } from '@angular/forms';
import { ComputersTableComponent } from './Components/computers-table/computers-table.component';
//import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ComputersComponent,
    GroupsComponent,
    ConfigsComponent,
    ReportsComponent,
    AdminsComponent,
    ComputerInfoComponent,
    NewGroupComponent,
    GroupEditComponent,
    NewConfigComponent,
    ConfigEditComponent,
    AdminConfigComponent,
    MenuComponent,
    TopBarComponent,
    Table1Component,
    Table2Component,
    Table3Component,
    SummaryComponent,
    ComputersTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    //MatSelectModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }