import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackStockComponent } from './track-stock.component';

describe('TrackStockComponent', () => {
  let component: TrackStockComponent;
  let fixture: ComponentFixture<TrackStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
