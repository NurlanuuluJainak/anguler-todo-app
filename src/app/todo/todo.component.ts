import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tasks } from '../model/tasks';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: Tasks[] = [];
  inprogress: Tasks[] = [];
  done: Tasks[] = [];
  updateIndext!: any;
  isEditEnabled: boolean = false;
  constructor(private fd: FormBuilder) {}
  ngOnInit(): void {
    this.todoForm = this.fd.group({
      item: ['', Validators.required],
    });
  }
  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false,
    });
    this.todoForm.reset();
  }
  editTask(item: Tasks, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndext = i;
    this.isEditEnabled = true;
  }
  updateTask() {
    this.tasks[this.updateIndext].description = this.todoForm.value.item;
    this.tasks[this.updateIndext].done = false;
    this.todoForm.reset();
    this.updateIndext = undefined;
    this.isEditEnabled = false;
  }
  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }
  deleteInprogressTask(i: number) {
    this.inprogress.splice(i, 1);
  }
  deleteDoneTask(i: number) {
    this.done.splice(i, 1);
  }
  drop(event: CdkDragDrop<Tasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
