import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsWidgetComponent } from './settings-widget.component';

describe('SettingsWidgetComponent', () => {
  let component: SettingsWidgetComponent;
  let fixture: ComponentFixture<SettingsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
