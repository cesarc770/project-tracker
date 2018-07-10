import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  projectsCollection: AngularFirestoreCollection<Project>;
  projectDoc: AngularFirestoreDocument<Project>;
  projects: Observable<Project[]>;
  project: Observable<Project>;

  constructor(private afs: AngularFirestore) {
    this.projectsCollection = this.afs.collection('projects', 
  ref => ref.orderBy('lastName', 'asc'));
   }

   getProjects(): Observable<Project[]> {
    this.projects = this.projectsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Project;
      const id = a.payload.doc.id;
      return { id, ...data };
    })))
    
     return this.projects;
  }
 }
