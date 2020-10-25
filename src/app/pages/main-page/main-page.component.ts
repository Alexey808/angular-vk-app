import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularVkuiConnectService, LogService } from 'angular-vkui-connect';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface IUser {
  firstName: string;
  lastName: string;
  id: number;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  user: IUser;
  subs$ = new Subject<void>();

  constructor(
    private connect: AngularVkuiConnectService,
    public log: LogService
  ) { }

  ngOnInit(): void {
    this.vkConnect();
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }

  private vkConnect(): void {
    this.connect.send('VKWebAppInit');

    // todo пока не понятно как отписаться
    this.connect.subscribe((event) => {
      console.log('event', event);
      if (event?.type === 'VKWebAppInitResult' && event.data.result) {
        this.loadUserInfo();
      }
    });
  }

  private loadUserInfo(): void {
    this.connect.sendObserver('VKWebAppGetUserInfo')
      .pipe(takeUntil(this.subs$))
      .subscribe((userData) => {
        this.user = {
          firstName: userData.first_name,
          lastName: userData.last_name,
          id: userData.id,
        };
      });
  }
}
