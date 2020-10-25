import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../main-page.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() user: IUser;

  constructor() { }

  ngOnInit(): void {
  }

  public doSomething(): void {

  }
}
