import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearchPageComponent } from './book-search-page.component';

describe('BookSearchPageComponent', () => {
  let component: BookSearchPageComponent;
  let fixture: ComponentFixture<BookSearchPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookSearchPageComponent]
    });
    fixture = TestBed.createComponent(BookSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
