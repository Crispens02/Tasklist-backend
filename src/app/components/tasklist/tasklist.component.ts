import { CompilerConfig } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/Model/Task';
import { taskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent implements OnInit {
  task1: Task[] = [];
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes;


  constructor(private taskS: taskService) {}

  ngOnInit(): void {
    this.cargarTask();
  }
  cargarTask(): void {
    this.taskS.lista().subscribe((data) => {
      this.task1 = data;
    });
  }
  delete(id?: number) {
    if (id != undefined) {
      this.taskS.delete(id).subscribe(
        (data) => {
          this.cargarTask();
        },
        (err) => {
          alert('No se pudo eliminar');
        }
      );
    }
  }


}

