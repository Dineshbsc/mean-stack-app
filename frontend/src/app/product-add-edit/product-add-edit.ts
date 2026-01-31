import { ApiService } from './../services/api';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-add-edit',
    imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './product-add-edit.html',
  styleUrl: './product-add-edit.css',
})
export class ProductAddEdit {
 form = {
    name: '',
    price: null as number | null,
    description: ''
  };

  isEdit = false;

  constructor(
    private dialogRef: MatDialogRef<ProductAddEdit>,
    private productService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
  ) {
    if (data) {
      this.isEdit = true;
      this.form = {
        name: data.name,
        price: data.price,
        description: data.description
      };
    }
  }

  save() {
    const apiCall = this.isEdit
      ? this.productService.update(this.data._id, this.form)
      : this.productService.create(this.form);

    apiCall.subscribe(() => {
      this.snackBar.open(`Product ${this.isEdit ? "Updated" : "Added" }  successfully! `, 'Close', {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top',
  panelClass: ['success-snackbar']
});
      this.dialogRef.close(true);
    });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
