import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraProdutosComponent } from './compra-produtos.component';

describe('CompraProdutosComponent', () => {
  let component: CompraProdutosComponent;
  let fixture: ComponentFixture<CompraProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompraProdutosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompraProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
