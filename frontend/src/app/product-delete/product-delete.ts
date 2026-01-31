import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-product-delete',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './product-delete.html',
  styleUrl: './product-delete.css',
})
export class ProductDelete {
constructor(
    public dialogRef: MatDialogRef<ProductDelete>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  onCancel(): void { this.dialogRef.close(false); }
  onConfirm(): void { this.dialogRef.close(true); }
}
