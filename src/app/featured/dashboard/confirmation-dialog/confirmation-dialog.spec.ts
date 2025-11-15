import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared-module';

import { ConfirmationDialog } from './confirmation-dialog';

describe('ConfirmationDialog', () => {
  let component: ConfirmationDialog;
  let fixture: ComponentFixture<ConfirmationDialog>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ConfirmationDialog>>;

  const mockData = { titulo: 'Confirm Delete', mensaje: 'Are you sure?' };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ConfirmationDialog],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have data properties with titulo and mensaje', () => {
    expect(component.data).toEqual(mockData);
    expect(component.data.titulo).toBe('Confirm Delete');
    expect(component.data.mensaje).toBe('Are you sure?');
  });

  it('should close dialog with true when confirmar is called', () => {
    component.confirmar();

    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false when cancelar is called', () => {
    component.cancelar();

    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });
});

