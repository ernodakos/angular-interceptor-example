import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotFoundComponent, NavigationComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NavigationComponent
  ]
})
export class SharedModule { }
