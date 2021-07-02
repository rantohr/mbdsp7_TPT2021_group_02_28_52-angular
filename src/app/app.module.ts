import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontHeaderComponent } from './shared/front-header/front-header.component';
import { FrontFooterComponent } from './shared/front-footer/front-footer.component';
import { HomeComponent } from './pages/home/home.component';
import { FixturesComponent } from './pages/fixtures/fixtures.component';
import { FixtureDetailComponent } from './pages/fixture-detail/fixture-detail.component';
import { FixtureResultsComponent } from './pages/fixture-results/fixture-results.component';
import { SearchModalComponent } from './shared/search-modal/search-modal.component';
import { LoginModalComponent } from './shared/login-modal/login-modal.component';
import { RegisterModalComponent } from './shared/register-modal/register-modal.component';
import { BetModalComponent } from './shared/bet-modal/bet-modal.component';
import { BetHistoryComponent } from './pages/bet-history/bet-history.component';
import { HomeAdminComponent } from './pages/administrator/home-admin/home-admin.component';
import { LoginAdminComponent } from './pages/administrator/login-admin/login-admin.component';
import { AdministratorComponent } from './pages/administrator/administrator.component';
import { MatchesAdminComponent } from './pages/administrator/matches-admin/matches-admin.component';
import { UsersAdminComponent } from './pages/administrator/users-admin/users-admin.component';
import { SettingsAdminComponent } from './pages/administrator/settings-admin/settings-admin.component';
import { ChartsAdminComponent } from './pages/administrator/charts-admin/charts-admin.component';
import { BreadcombAreaComponent } from './shared/breadcomb-area/breadcomb-area.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogWarningComponent } from './shared/dialog-warning/dialog-warning.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AreaChartComponent } from './shared/charts/area-chart/area-chart.component';
import { LineChartComponent } from './shared/charts/line-chart/line-chart.component';
import { RadarChartComponent } from './shared/charts/radar-chart/radar-chart.component';
import { CardDashboardComponent } from './shared/card-dashboard/card-dashboard.component';
import { UsersFormComponent } from './shared/forms/users-form/users-form.component';
import { BetsAdminComponent } from './pages/administrator/bets-admin/bets-admin.component';
import { NewsAdminComponent } from './pages/administrator/news-admin/news-admin.component';
import { GameFormComponent } from './shared/forms/game-form/game-form.component';
import { NewsFormComponent } from './shared/forms/news-form/news-form.component';
import { ForgetModalComponent } from './shared/forget-modal/forget-modal.component';
import { ResetModalComponent } from './shared/reset-modal/reset-modal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuard } from './core/service/auth/auth.guard';
import { AuthService } from './core/service/auth/auth.service';
import { TokenInterceptor } from './core/service/http-interceptors/token-interceptor';
import { NotificationComponent } from './shared/notification/notification.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderComponent } from './shared/loader/loader.component';
import { UserProfilModalComponent } from './shared/user-profil-modal/user-profil-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    FrontHeaderComponent,
    FrontFooterComponent,
    HomeComponent,
    FixturesComponent,
    FixtureDetailComponent,
    FixtureResultsComponent,
    SearchModalComponent,
    LoginModalComponent,
    RegisterModalComponent,
    BetModalComponent,
    BetHistoryComponent,
    HomeAdminComponent,
    LoginAdminComponent,
    AdministratorComponent,
    HomeAdminComponent,
    MatchesAdminComponent,
    UsersAdminComponent,
    SettingsAdminComponent,
    ChartsAdminComponent,
    BreadcombAreaComponent,
    DialogWarningComponent,
    AreaChartComponent,
    LineChartComponent,
    RadarChartComponent,
    CardDashboardComponent,
    UsersFormComponent,
    BetsAdminComponent,
    NewsAdminComponent,
    GameFormComponent,
    NewsFormComponent,
    ForgetModalComponent,
    ResetModalComponent,
    NotificationComponent,
    LoaderComponent,
    UserProfilModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    JwtHelperService,
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
