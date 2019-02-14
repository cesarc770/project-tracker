import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../models/Project';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  project: Project = {
    projectName: '',
    projectOwner: '',
    description: '',
    viewers: []
  }

  @ViewChild('projectForm') form: any;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private auth: AuthService
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
      value.viewers = [this.auth.getCurrentUserInfo().userId];
      // add new project
      this.clientService.newProject(value);
      //redirect
      this.router.navigate(['/projects']);
    }
  }

}
