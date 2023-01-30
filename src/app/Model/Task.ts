export class Task {
    id? : number;
    task : string;
    date : string;
  
    constructor(task: string,  date: string) {
        this.task = task;
        this.date = date;
     
    }
}