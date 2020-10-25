import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../main-page.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() public user: IUser;

  constructor() { }

  ngOnInit(): void {
    console.log('user ->>>', this.user);
  }

  public doSomething(): void {

  }
}
