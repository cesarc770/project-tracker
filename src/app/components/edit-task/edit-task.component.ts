import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '../../models/Project';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  id: string;
  taskId: string;
  project: Project;
  task: Task;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.taskId = this.route.snapshot.params['taskid'];

    this.clientService.getProject(this.id).subscribe(project => {
      this.project = project;
    })

    this.clientService.getTasks(this.id).subscribe(tasks => {
      for(var i = 0; i < tasks.length; i++){
        if (tasks[i].id == this.taskId) {
          this.task = tasks[i];
          return this.task;
        }
      }
    })
  }

  onSubmit(data) {

    var newTask = {
      id: this.task.id,
      name: data.value.name ? data.value.name : this.task.name,
      status: data.value.status ? data.value.status : this.task.status,
      description: data.value.description ? data.value.description : this.task.description,
      points: data.value.points ? data.value.points : this.task.points
    }

    //take that task out and replace with updated task
    for(var i = 0; i < this.project.tasks.length; i++){
      if(newTask.id == this.project.tasks[i].id){
        this.project.tasks.splice(i,1,newTask);
      }
    }

    this.clientService.updateProjectBasicInfo(this.project);
    
    //redirect
    this.router.navigate([`/projects/${this.project.id}/tasks`]);

  }

  onDelete() {

    //in the future this logic needs to be moved to the service
    for(var i = 0; i < this.project.tasks.length; i++){
      if(this.task.id == this.project.tasks[i].id){
        this.project.tasks.splice(i,1);
      }
    }

    this.clientService.updateProjectBasicInfo(this.project);
    
    //redirect
    this.router.navigate([`/projects/${this.project.id}/tasks`]);
  }

}
