import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api';
import { NavBar } from '../nav-bar/nav-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ProductAddEdit } from '../product-add-edit/product-add-edit';
import { ProductDelete } from '../product-delete/product-delete';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-products',
  imports: [MatSnackBarModule, NavBar, CommonModule, FormsModule, MatFormFieldModule, MatTableModule, MatIconModule, MatDialogModule, MatButtonModule, MatInputModule,],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  displayedColumns = ['id', 'name', 'price', 'actions'];
    dataSource = new MatTableDataSource<any>([]);

  constructor(
    private productService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

   loadProducts() {
    this.productService.getAll().subscribe((res: any) => {
      // ✅ SAFE update
      this.dataSource.data = res;
    });
  }

  openAdd() {
    this.dialog.open(ProductAddEdit).afterClosed()
      .subscribe(res => res && this.loadProducts());
  }

  openEdit(product: any) {
    this.dialog.open(ProductAddEdit, {
      data: product
    }).afterClosed().subscribe(res => res && this.loadProducts());
  }

openDelete(id: string) {
  this.dialog.open(ProductDelete).afterClosed()
    .subscribe(confirm => {
      if (confirm) {
        this.productService.delete(id).subscribe(() => {
          this.snackBar.open('Product deleted successfully! ', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });

          this.loadProducts(); // Refresh the table
        });
      }
    });
}
}
