import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfUiComponent } from './pdf-ui.component';

describe('PdfUiComponent', () => {
  let component: PdfUiComponent;
  let fixture: ComponentFixture<PdfUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
