import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Project } from '../../models/Project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  id: string;
  project: Project;
  isEditing: boolean = false;
  // isDisabled: boolean = true;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { 

  }

  ngOnInit() {
    //get id from url
    this.id = this.route.snapshot.params['id'];

    this.clientService.getProject(this.id).subscribe(project => {
      this.project = project;
      console.log(this.project);
    })
  }

  edit(){
    this.id = this.route.snapshot.params['id'];
    this.isEditing = true;
  }

  cancelEdit(){
    this.isEditing = false;
  }

  deleteProject(){
    if(confirm('Are you sure?')){
      this.clientService.delete(this.project.id);
      this.router.navigate(['/projects']);
    }
    
    
  }

  completeEdit({value, valid}: {value: Project, valid: boolean}){
    if(!valid) {
      //show error
    } else {
      if(value.description == undefined) {
        value.description = "";
      }
      var accept = confirm('Are you sure you want to make changes?')
      //send new information to database
      if(accept) {
        this.project.description = value.description;
        this.project.projectName = value.projectName;
        this.project.projectOwner = value.projectOwner;
        this.clientService.updateProjectBasicInfo(this.project);
        this.isEditing = false;
      } else {
        return null;
      }
      
    }
    
  }

}
