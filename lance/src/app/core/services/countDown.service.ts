import { Injectable } from "@angular/core";
import { timer, Subject, Observable, ReplaySubject, Subscription } from "rxjs";
import { takeWhile, map, takeUntil } from "rxjs/operators";

@Injectable()
export class CountdownService {
  private _countdown = new Subject<number>();
  private destroyed$ = new Subject<boolean>();
  private sub: Subscription;

  countdown(): Observable<number> {
    return this._countdown.asObservable();
  }

  private isCounting = false;

  start(count: number): void {
    // Ensure that only one timer is in progress at any given time.
    if (!this.isCounting) {
      this.isCounting = true;
      this.sub = timer(0, 1000)
        .pipe(
          takeWhile(t => t < count),
          map(t => count - t)
        )
        .subscribe(t => this._countdown.next(t), null, () => {
          this._countdown.complete();
          this.isCounting = false;
          // Reset the countdown Subject so that a
          // countdown can be performed more than once.
          this._countdown = new Subject<number>();
        });
    }
  }

  stop() {
    this.sub.unsubscribe();
    this._countdown.complete();
    this.isCounting = false;
    console.log(this.isCounting);
  }
}
