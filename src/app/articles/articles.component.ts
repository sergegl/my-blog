import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { EMPTY, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  public posts: ScullyRoute[] = [];
  private destroy$ = new Subject<void>();

  constructor(private scullyService: ScullyRoutesService) {}

  ngOnInit(): void {
    this.scullyService.available$
      .pipe(takeUntil(this.destroy$))
      .subscribe((posts) => (this.posts = posts.filter((post) => post.title)));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
