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
import { AuthGuard } from './core/service/auth/auth.guard';
import { RoleGuardService } from './core/service/auth/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'fixtures',
    component: FixturesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'details',
    component: FixtureDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'results',
    component: FixtureResultsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'history', component: BetHistoryComponent, canActivate: [AuthGuard] },
  {
    path: 'administrator',
    component: AdministratorComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeAdminComponent },
      { path: 'match', component: MatchsAdminComponent },
      { path: 'users', component: UsersAdminComponent },
      { path: 'charts', component: ChartsAdminComponent },
      { path: 'bets', component: BetsAdminComponent },
      { path: 'news', component: NewsAdminComponent },
    ],
    canActivate: [AuthGuard, RoleGuardService],
    data: {
      role: ['admin'],
    },
  },
  { path: 'administrator/login', component: LoginAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
