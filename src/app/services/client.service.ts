import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/Project';
import { Task } from '../models/Task';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  projectsCollection: AngularFirestoreCollection<Project>;
  projectDoc: AngularFirestoreDocument<Project>;
  projects: Observable<Project[]>;
  project: Observable<Project>;
  tasks: Observable<Task[]>;
  todos: Observable<Task[]>;
  inProgress: Observable<Task[]>;
  complete: Observable<Task[]>;
  todoPoints: number = 0;
  inProgressPoints: number = 0;
  completePoints: number = 0;

  user;

  constructor(private afs: AngularFirestore, private auth:AuthService) {
    this.projectsCollection = this.afs.collection('projects');
    this.user = this.auth.getCurrentUserInfo().userId;
   }

   getProjects(): Observable<Project[]> {
    this.projects = this.projectsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Project;
      const id = a.payload.doc.id;
      for(let i = 0; i < data.viewers.length; i++){
        if(data.viewers[i] == this.auth.getCurrentUserInfo().userId) {
          return{ id, ...data };
        }
      }   
    })))
     return this.projects;
  }

  getProject(id: string): Observable<Project> {
    this.projectDoc = this.afs.doc<Project>(`projects/${id}`);
    this.project =  this.projectDoc.snapshotChanges().pipe(map(actions => {
      if(actions.payload.exists === false) {
        return null;
      } else {
        const data = actions.payload.data() as Project;
        data.id = actions.payload.id;
        return data;
      }
    }));
    return this.project;
  }

  getTasks(id: string): Observable<Task[]> {
    this.projectDoc = this.afs.doc<Project>(`projects/${id}`);
    this.tasks =  this.projectDoc.snapshotChanges().pipe(map(actions => {
      if(actions.payload.exists === false) {
        return null;
      } else {
        const data = actions.payload.data() as Project;
        data.id = actions.payload.id;
        return data.tasks;
      }
    }));
    return this.tasks;
  }

  getTodos(id: string): Observable<Task[]> {
    var points: number = 0;
    this.projectDoc = this.afs.doc<Project>(`projects/${id}`);
    this.todos =  this.projectDoc.snapshotChanges().pipe(map(actions => {
      if(actions.payload.exists === false) {
        return null;
      } else {
        const todo = [];
        const data = actions.payload.data() as Project;
        data.id = actions.payload.id;
        for(var i = 0; i < data.tasks.length; i++){
          if(data.tasks[i].status == 'todo'){
            todo.push(data.tasks[i]);
            points += Number(data.tasks[i].points);
          }
        }
        this.todoPoints = points;
        return todo;
      }
    }));
    return this.todos;
  }

  getInProgress(id: string): Observable<Task[]> {
    var points: number = 0;
    this.projectDoc = this.afs.doc<Project>(`projects/${id}`);
    this.inProgress =  this.projectDoc.snapshotChanges().pipe(map(actions => {
      if(actions.payload.exists === false) {
        return null;
      } else {
        const inProgress = [];
        const data = actions.payload.data() as Project;
        data.id = actions.payload.id;
        for(var i = 0; i < data.tasks.length; i++){
          if(data.tasks[i].status == 'In Progress'){
            inProgress.push(data.tasks[i]);
            points += Number(data.tasks[i].points);
          }
        }
        this.inProgressPoints = points;
        return inProgress;
      }
    }));
    return this.inProgress;
  }

  getComplete(id: string): Observable<Task[]> {
    var points:number = 0;
    this.projectDoc = this.afs.doc<Project>(`projects/${id}`);
    this.complete =  this.projectDoc.snapshotChanges().pipe(map(actions => {
      if(actions.payload.exists === false) {
        return null;
      } else {
        const complete = [];
        const data = actions.payload.data() as Project;
        data.id = actions.payload.id;
        for(var i = 0; i < data.tasks.length; i++){
          if(data.tasks[i].status == 'Complete'){
            complete.push(data.tasks[i]);
            points += Number(data.tasks[i].points);
          }
        }
        this.completePoints = points;
        return complete;
      }
    }));
    return this.complete;
  }

  newProject(project: Project) {
    this.projectsCollection.add(project);
  }

  updateProjectBasicInfo(project: Project) {
    this.projectDoc = this.afs.doc(`projects/${project.id}`);
    this.projectDoc.update(project);
  }

  delete(id: string){
    this.projectDoc = this.afs.doc(`projects/${id}`);
    this.projectDoc.delete();
  }
 }
