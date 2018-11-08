import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Project } from '../../models/Project';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  id: string;
  project: Project;
  tasks: any[];
  todo: any[] = [];
  inProgress: any[] = [];
  complete: any[] = [];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
     //get id from url
     this.id = this.route.snapshot.params['id'];

     this.clientService.getProject(this.id).subscribe(project => {
       this.project = project;
       this.determineTaskStatus(project.tasks);
     })
  }

  determineTaskStatus(tasks) {
    for(var i = 0; i < tasks.length; i++){
      let task = tasks[i];

      if(task.status == 'todo') {
        this.todo.push(task);
      } else if (task.status == 'In Progress') {
        this.inProgress.push(task);
      } else {
        this.complete.push(task);
      }
    }

  }

  

}
