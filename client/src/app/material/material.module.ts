import { NgModule } from "@angular/core";

import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatDialogModule
} from "@angular/material";

@NgModule({
  imports: [MatToolbarModule, MatSidenavModule, MatListModule, MatDialogModule],
  declarations: [],
  exports: [MatToolbarModule, MatSidenavModule, MatListModule, MatDialogModule]
})
export class MaterialModule {}
