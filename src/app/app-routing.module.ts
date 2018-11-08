import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from 
'./components/dashboard/dashboard.component';
import { SettingsComponent } from 
'./components/settings/settings.component';
import { AddProjectComponent } from 
'./components/add-project/add-project.component';
import { ProjectsComponent } from 
'./components/projects/projects.component';
import { TasksComponent } from 
'./components/tasks/tasks.component';
import { ProjectDetailsComponent } from 
'./components/project-details/project-details.component';
import { NotFoundComponent } from 
'./components/not-found/not-found.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { ProjectsContainerComponent } from './components/projects-container/projects-container.component';
import { AppContainerComponent } from './components/app-container/app-container.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', 
    component: AppContainerComponent,
    children: [{
      path: '',
      component: MainComponent,
      children: [
        {path: '', component: DashboardComponent},
        {path: 'settings', component: SettingsComponent},
        {path: 'add-project', component: AddProjectComponent},
        {path: 'projects', 
        component: ProjectsContainerComponent,
        children: [
          {path:'', component: ProjectsComponent},
          {path: ':id', component: ProjectDetailsComponent},
          {path: ':id/tasks', component: TasksComponent},
          {path: ':id/tasks/add', component: AddTaskComponent},
          {path: ':id/tasks/edit/:taskid', component: EditTaskComponent}
        
        ]}
      ]
    }]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
