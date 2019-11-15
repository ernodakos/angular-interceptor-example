import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { TaskDto } from '../dtos/task.dto';
import { HttpVerb } from 'src/app/shared/interfaces/http-verb.enum';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends ApiService {
  readonly apiEndPoint:string =  "/task";
  
 
  public list():Observable<TaskDto[]>
  {
    return this.request<TaskDto[]>(HttpVerb.GET,this.apiEndPoint);
  }

  public create(task: TaskDto):Observable<TaskDto>{
    return this.request<TaskDto>(HttpVerb.POST,this.apiEndPoint,task);
  }

  public update(task: TaskDto):Observable<TaskDto>{
    return this.request<TaskDto>(HttpVerb.PATCH,`/task/${task.id}`,task);
  }
  
  public delete(task: TaskDto):Observable<TaskDto>{
    return this.request<TaskDto>(HttpVerb.DELETE,`/task/${task.id}`,task);
  }
  
}
