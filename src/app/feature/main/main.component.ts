import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private subscription: Subscription | null = null;
  public showPopup: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    const popupTimer = timer(5000);

    this.subscription = popupTimer.subscribe(() => {
      this.showPopup = false;
    });
  }

  hidePopup(): void {
    this.showPopup = false;
  }

  ngOnDestroy(): void {
    // Отписываемся от observable при уходе со страницы
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
