import { Routes } from '@angular/router';
import { MainLayout } from './core/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: 'alumnos',
                loadChildren: () =>
                    import('./alumnos/alumnos-module').then((m) => m.AlumnosModule),
            },
            {
                path: '',
                redirectTo: 'alumnos',
                pathMatch: 'full',
            },
        ],
    }
];
