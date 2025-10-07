import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesAddPage } from './articles-add-page';

describe('ArticlesAddPage', () => {
  let component: ArticlesAddPage;
  let fixture: ComponentFixture<ArticlesAddPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesAddPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
