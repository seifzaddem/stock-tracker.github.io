import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StockTrackerContainerComponent} from './stock-tracker-container.component';

describe('MainComponent', () => {
  let component: StockTrackerContainerComponent;
  let fixture: ComponentFixture<StockTrackerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockTrackerContainerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StockTrackerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
