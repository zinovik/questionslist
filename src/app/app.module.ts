import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionslistApiService } from './questionslist-api.service';
import { QuestionsTreeComponent } from './questions-tree/questions-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    QuestionsTreeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    QuestionslistApiService,
    Location, {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    }
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
