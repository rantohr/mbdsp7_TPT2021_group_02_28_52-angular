import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BetHistoryComponent } from './pages/bet-history/bet-history.component';
import { FixtureDetailComponent } from './pages/fixture-detail/fixture-detail.component';
import { FixtureResultsComponent } from './pages/fixture-results/fixture-results.component';
import { FixturesComponent } from './pages/fixtures/fixtures.component';
import { AdministratorComponent } from './pages/administrator/administrator.component';
import { BetsAdminComponent } from './pages/administrator/bets-admin/bets-admin.component';
import { ChartsAdminComponent } from './pages/administrator/charts-admin/charts-admin.component';
import { HomeAdminComponent } from './pages/administrator/home-admin/home-admin.component';
import { LoginAdminComponent } from './pages/administrator/login-admin/login-admin.component';
import { MatchsAdminComponent } from './pages/administrator/matchs-admin/matchs-admin.component';
import { NewsAdminComponent } from './pages/administrator/news-admin/news-admin.component';
import { SettingsAdminComponent } from './pages/administrator/settings-admin/settings-admin.component';
import { UsersAdminComponent } from './pages/administrator/users-admin/users-admin.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'fixtures', component: FixturesComponent },
  { path: 'details', component: FixtureDetailComponent },
  { path: 'results', component: FixtureResultsComponent },
  { path: 'history', component: BetHistoryComponent },
  {
    path: 'administrator',
    component: AdministratorComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeAdminComponent, canActivate: [] },
      { path: 'match', component: MatchsAdminComponent, canActivate: [] },
      { path: 'users', component: UsersAdminComponent, canActivate: [] },
      { path: 'charts', component: ChartsAdminComponent, canActivate: [] },
      { path: 'bets', component: BetsAdminComponent, canActivate: [] },
      { path: 'news', component: NewsAdminComponent, canActivate: [] },
    ],
  },
  { path: 'administrator/login', component: LoginAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
