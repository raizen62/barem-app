import { Component } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router, NavigationStart } from '@angular/router';
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'barem-app';

  constructor(
    router: Router
  ){
    router.events
      .pipe(
        filter(
          (event: NavigationEvent) => {
            return (event instanceof NavigationStart);
          }
        ),
        untilDestroyed(this)
      )
      .subscribe(
        (event: NavigationStart) => {

          console.group("NavigationStart Event");

          console.log("navigation id:", event.id);
          console.log("route:", event.url);
          console.log("trigger:", event.navigationTrigger);

          if (event.restoredState) {

            console.warn(
              "restoring navigation id:",
              event.restoredState.navigationId
            );

          }
          console.groupEnd();
        }
      );
  }

  ngOnDestroy(){
    
  }
}
