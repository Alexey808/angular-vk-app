import { Component, OnDestroy, OnInit } from '@angular/core';
import bridge from '@vkontakte/vk-bridge';

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

  VK_EVENTS = {
    VKWebAppGetUserInfo: 'VKWebAppGetUserInfoResult'
  };

  public user: IUser;
  public data;
  public event;

  constructor() { }

  ngOnInit(): void {
    this.vkAppInit();
    this.getUserData();
  }

  private vkAppInit(): void {
    bridge.subscribe(event => {
      // console.log('--->', event);
      const { detail } = event;
      const type = detail?.type || null;
      const data = detail?.data || null;

      this.data = data;

      if (type === this.VK_EVENTS.VKWebAppGetUserInfo && data) {
        // debugger
        // this.user = {
        //   firstName: data.first_name,
        //   lastName: data.last_name,
        //   id: data.id,
        // };


      }

      console.log(event);
      this.event = event;
    });

    bridge.send('VKWebAppInit');
  }

  private getUserData(): void {
    bridge.send('VKWebAppGetUserInfo');
  }

  ngOnDestroy(): void {
    bridge.unsubscribe(this.vkAppInit);
    bridge.unsubscribe(this.getUserData);
  }
}
