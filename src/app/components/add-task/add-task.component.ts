import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Task } from 'src/app/Model/Task';
import { Subscription } from 'rxjs';
import { taskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask = new EventEmitter<{ task: string; date: string }>();
  tsk: Task[] = [];
  task: string = '';
  date: string = '';
  reminder:boolean = false;
  showAddTask: boolean = true;
  subscription?: Subscription;

  constructor(
   
    private taskS: taskService,
    private router: Router,
    private uiService: UiService
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {

   
  
  }

  CargarTask(): void {
    this.taskS.lista().subscribe((data) => {
      this.tsk = data;
    });
  }

  onCreate(): void {
    const {task, date,reminder} = this;
    const newTask = {task, date, reminder};

    this.onAddTask.emit(newTask);
    const task1 = new Task(this.task, this.date);
    this.taskS.save(task1).subscribe(
      (data) => {
        this.uiService.onToggle();
      },
      (err) => {
        alert('Algo falló');
      }
    );
    window.location.reload();
    if (this.task.length === 0){
      alert ("Please, add a task!");
      return;
    }
   
  }




  onSubmit(){
    
    if (this.task.length === 0){
      alert ("Please, add a task!");
      return;
    }
    const {task, date} = this;
    const newTask = {task, date};

    this.onAddTask.emit(newTask);
    this.uiService.onToggle();
    window.location.reload();
  }

}