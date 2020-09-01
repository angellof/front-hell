import { SingInComponent } from './home/sing-in/sing-in.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver.pipe';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';

const routes: Routes = [
  {path: '', component: SingInComponent},
  {
    path: 'user/:userName', component: PhotoListComponent,
    resolve: {photos: PhotoListResolver}
  },
  { path: 'photo/add', component: PhotoFormComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
