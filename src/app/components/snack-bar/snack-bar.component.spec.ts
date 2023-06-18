import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackBarComponent } from './snack-bar.component';

describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;
  let snackBar : MatSnackBar
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnackBarComponent],
      providers: [MatSnackBar]
    });
    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    snackBar = TestBed.inject(MatSnackBar)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
