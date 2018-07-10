import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

import { Project } from '../../models/Project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getProjects().subscribe(projects =>{
      this.projects = projects;
    console.log(projects)})
  }

}
