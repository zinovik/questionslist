import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionslistApiService } from './questionslist-api.service';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    QuestionslistApiService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
