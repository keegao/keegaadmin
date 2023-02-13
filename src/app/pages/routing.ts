import { Routes } from '@angular/router';
import { AuthGuard2 } from '../modules/auth/services/auth.guard';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },

  {

    canActivate: [AuthGuard2],
    path: 'partner',
    loadChildren: () =>
      import('../modules/parter/parter.module').then((m) => m.ParterModule),
  },

  {

  

    path: 'vendor/account',
    loadChildren: () =>
      import('../modules/vendor-account/vendor-account.module').then((m) => m.VendorAccountModule),
  },


  {

    path: 'vendor',
    loadChildren: () =>
      import('../modules/vendor/vendor.module').then((m) => m.VendorModule),
  },

  {

    path: 'produit',
    loadChildren: () =>
      import('../modules/produit/produit.module').then((m) => m.ProduitModule),
  },

  


  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
