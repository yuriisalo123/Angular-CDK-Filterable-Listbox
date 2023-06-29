import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListboxComponent } from './listbox/listbox';
import { CommonModule } from '@angular/common';
import { CdkListboxModule } from '@angular/cdk/listbox';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ListboxComponent],
  imports: [BrowserModule, CommonModule, CdkListboxModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
