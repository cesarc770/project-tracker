import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Project } from '../../models/Project';
import { forEach } from '@angular/router/src/utils/collection';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  id: string;
  project: Project;
  tasks: Task[];
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
     })
     this.clientService.getTodos(this.id).subscribe(tasks => {
      this.todo = tasks;
    })
  }

}
