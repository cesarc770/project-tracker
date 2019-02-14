import { Task } from './Task';

export interface Project {
    id?: string;
    description?: string,
    projectName?: string,
    projectOwner?: string,
    tasks?: Task[],
    viewers?: any[]
}