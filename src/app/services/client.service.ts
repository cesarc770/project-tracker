import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/Project';
import { Task } from '../models/Task';

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
  inProgess: Observable<Task[]>;
  complete: Observable<Task[]>;

  constructor(private afs: AngularFirestore) {
    this.projectsCollection = this.afs.collection('projects');
   }

   getProjects(): Observable<Project[]> {
    this.projects = this.projectsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Project;
      const id = a.payload.doc.id;
      return { id, ...data };
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
          }
        }
        return todo;
      }
    }));
    return this.todos;
  }

  newProject(project: Project) {
    this.projectsCollection.add(project);
  }

  updateProjectBasicInfo(project: Project) {
    console.log("ID ",project.id)
    this.projectDoc = this.afs.doc(`projects/${project.id}`);
    this.projectDoc.update(project);
  }

  delete(id: string){
    this.projectDoc = this.afs.doc(`projects/${id}`);
    this.projectDoc.delete();
  }
 }
