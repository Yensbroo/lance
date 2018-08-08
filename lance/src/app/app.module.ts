import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


/**
 * Modules
 */
import { CoreModule } from "./core/core.module";
import { MaterialModule } from "./material/material.module";
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store'
import { AppRoutingModule } from "./app-routing.module";
import { ProjectsModule } from "./projects/projects.module";
import { localStorageSync } from 'ngrx-store-localstorage'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthenticationModule } from "./authentication/authentication.module";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from "./store/effects/auth.effects";
import { reducers } from './store/app.state';

/**
 * Components
 */
import { AuthenticationService } from "./core/services/authentication.service";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'
import { LandingComponent } from "./home/landing/landing.component";
import { OpdrachtComponent } from "./home/opdracht/opdracht.component";
import { BiedenComponent } from "./home/bieden/bieden.component";
import { CategoriesComponent } from "./home/categories/categories.component";
import { environment } from "../environments/environment.prod";

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync(
    {
      keys: ['token'],
      rehydrate: true
    }
  )(reducer)
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    OpdrachtComponent,
    BiedenComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ProjectsModule,
    FormsModule,
    AuthenticationModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
