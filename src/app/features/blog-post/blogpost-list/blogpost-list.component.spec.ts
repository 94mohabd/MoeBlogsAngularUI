import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostListComponent } from './blogpost-list.component';

describe('BlogPostsComponent', () => {
  let component: BlogPostListComponent;
  let fixture: ComponentFixture<BlogPostListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogPostListComponent]
    });
    fixture = TestBed.createComponent(BlogPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
