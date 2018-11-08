import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Project } from '../../models/Project';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  project: Project;
  id:string;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.clientService.getProject(this.id).subscribe(project => {
      this.project = project;
    })
  }

  onSubmit(data) {
    var newTask = {
      name: data.value.name,
      status: data.value.status,
      description: data.value.description,
      points: data.value.points
    }

    this.project.tasks.push(newTask);
    this.clientService.updateProjectBasicInfo(this.project);
  }

}
