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
    let temp = [];
    this.clientService.getProjects().subscribe(projects =>{
      console.log(projects);
      for(let i = 0; i < projects.length; i ++) {
        if(projects[i]) {
          temp.push(projects[i]);
        }
      }
      this.projects = temp;})
  }

}
