import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Project } from '../../models/Project';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  id: string;
  project: Project;
  tasks: any[];

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
       this.tasks = project.tasks;
     })
  }

  

}
