import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrexinService } from 'src/app/services/crexin.service';

@Component({
  selector: 'app-categorieslist',
  templateUrl: './categorieslist.component.html',
  styleUrls: ['./categorieslist.component.css']
})
export class CategorieslistComponent implements OnInit {
  categories: any;
  cat_id: any;

  constructor(private route:Router, private crexinservice:CrexinService) { }

  ngOnInit(): void {
   this.cat_id = localStorage.getItem('cat_id');
  }
  subcategories(){
    this.route.navigate(['/rent/subcategories'])
  }
}
