import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrexinService } from 'src/app/services/crexin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  allcategories: any;
  selectedItem: any;
  constructor(private toastr:ToastrService,private router:Router,private http:HttpClient,private activeroute:ActivatedRoute, private route:Router, private crexinservice:CrexinService) { }

  ngOnInit(): void {
    this.crexinservice.getallcategories().subscribe((res)=>{
      console.log(res.categories);
      this.allcategories = res.categories;
      // this.loading = false;
    });
  }
  subcategories(event,id:any,name:any,categorie){
    this.selectedItem = categorie.c_name;
    console.log(name);
    localStorage.setItem('cat_id', id);
    localStorage.setItem('cat_name', name);
    this.route.navigate(['/rent/subcategories']);
  }
}
