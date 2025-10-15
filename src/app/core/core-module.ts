import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayout } from './main-layout/main-layout';
import { Navbar } from './navbar/navbar';
import { Sidenav } from './sidenav/sidenav';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { ConfirmationDialog } from './confirmation-dialog/confirmation-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MainLayout,
    Navbar,
    Sidenav,
    ConfirmationDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    MainLayout,
    Navbar,
    Sidenav
  ],
})
export class CoreModule { }
