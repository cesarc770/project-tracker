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

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'add-project', component: AddProjectComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/:id', component: ProjectDetailsComponent},
  {path: 'projects/:id/tasks', component: TasksComponent},
  {path: 'projects/:id/tasks/add', component: AddTaskComponent},
  {path: 'projects/:id/tasks/edit/:taskid', component: EditTaskComponent},
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
