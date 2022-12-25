import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmulatorScreenComponent } from './emulator-screen/emulator-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    EmulatorScreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, EmulatorScreenComponent]
})
export class AppModule { }
