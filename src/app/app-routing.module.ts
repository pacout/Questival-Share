import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [       
    //{ path: 'helloSign', loadChildren: './helloSign/helloSign.module#HelloSignModule' },        
    { path: '**', redirectTo: 'not-found' },
    {
        path: '',
        component: AppComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
