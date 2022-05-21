import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsChartComponent } from './visitors-chart.component';

describe('VisitorsChartComponent', () => {
  let component: VisitorsChartComponent;
  let fixture: ComponentFixture<VisitorsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
