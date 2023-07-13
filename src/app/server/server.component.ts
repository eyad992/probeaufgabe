import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
public selectedDiv: number | undefined;


toggleServer(divNumber: number):void {
  this.selectedDiv = divNumber;

    console.log('clicked')
  }
}
