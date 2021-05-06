import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ownerReducer } from './state/owners.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { OwnerEffects } from './state/effects/owner.effects';
import { OwnerRemoveEffects } from './state/effects/owner.remove.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    InternalServerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: '404', component: NotFoundComponent},
      {path: '500', component: InternalServerComponent},
      {path: 'owner', loadChildren: () => import('./owner/owner.module').then(m=>m.OwnerModule) },
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: '**', redirectTo: '/404', pathMatch: 'full'}
    ]),
    StoreModule.forRoot({
      owners: ownerReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([OwnerEffects, OwnerRemoveEffects])
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
