import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './config.service';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

export function loadConfig(config: ConfigService) {
  console.log(config);
  return () => config.initialize();
}

@NgModule({
  declarations: [AppComponent, AuthCallbackComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
