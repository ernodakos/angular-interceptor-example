import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskDto } from '../../dtos/task.dto';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public tasks: TaskDto[] ;
  public loading=false;
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  public addNewTask(){
    let task = new TaskDto();
    task.name = "New Task";

    this.taskService.create(task).subscribe(()=> this.loadTasks());
  }

  public loadTasks(){
    this.loading = true;
    this.taskService.list().subscribe(
      (tasks: TaskDto[]) =>  {
        //this.tasks = tasks.filter(a => !a.is_done);
        this.tasks = tasks.map(a => {
          a.name = "Hell "+ a.name ;
          return a;
        });
        this.loading = false
      },
       err => {
         console.log(err);
         this.loading = false
        }
   );
  }

 

}
