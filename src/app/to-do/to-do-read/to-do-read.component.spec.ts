import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoReadComponent } from './to-do-read.component';

describe('ToDoReadComponent', () => {
  let component: ToDoReadComponent;
  let fixture: ComponentFixture<ToDoReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
