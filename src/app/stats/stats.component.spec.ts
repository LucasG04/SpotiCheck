import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatSnackBarModule
} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { StatsComponent } from './stats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      declarations: [ StatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('first letter should be caps', () => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    const result = component.capitalizeFirstLetter('elvis');
    expect(/^[A-Z]/.test(result)).toBeTruthy();
  });
});
