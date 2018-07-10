import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../models/Project';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  project: Project = {
    projectName: '',
    projectOwner: '',
    description: ''
  }

  @ViewChild('projectForm') form: any;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Project, valid: boolean}){
    if(!valid) {
      //show error
    } else {
      if(value.description == undefined) {
        value.description = "";
      }
      // add new project
      this.clientService.newProject(value);
      //redirect
      this.router.navigate(['/projects']);
    }
  }

}
