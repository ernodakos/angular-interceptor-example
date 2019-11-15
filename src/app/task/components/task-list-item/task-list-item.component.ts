import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskDto } from '../../dtos/task.dto';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit {
  @Input() public task: TaskDto;
  @Input() public disabled:boolean;
  @Output() public taskChange = new EventEmitter<TaskDto>();
  @Output() public error = new EventEmitter<void>();
  @Output() public delete = new EventEmitter<TaskDto>();

  public loading=false;
  public now = Date.now();
  public timeKeeper: number;

  constructor(private taskService:TaskService) {
   }

  ngOnInit() {
    this.timeKeeper = window.setInterval(() => {
      this.now = Date.now();
    },1000);
  }

  public ngOnDestroy(){
    window.clearInterval(this.timeKeeper);
  }

  public updateTask(){
    this.loading = true;
    this.taskService.update(this.task).subscribe((updatedTask)=> {
        this.taskChange.emit(updatedTask);
        this.loading=false;
      },
      (err) =>
      {
        this.error.emit();
        this.loading=false;
      }
      );;
  }

  public deleteTask(){

    if(window.confirm("Are you sure you delete this item?")){
      this.loading = true;
      this.taskService.delete(this.task).subscribe((deletedTask)=> {
        this.error.emit();
        //this.taskChange.emit(updatedTask);
        this.loading=false;
      },
      (err) =>
      {
        this.error.emit();
        //this.taskChange.emit(this.task);
        this.loading=false;
      }
      );;
    }
  }



}
