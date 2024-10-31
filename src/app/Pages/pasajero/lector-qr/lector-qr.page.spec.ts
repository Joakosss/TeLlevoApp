import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LectorQrPage } from './lector-qr.page';
import { IonicModule } from '@ionic/angular';

describe('LectorQrPage', () => {
  let component: LectorQrPage;
  let fixture: ComponentFixture<LectorQrPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LectorQrPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(LectorQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
