import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';
declare var $: any;
@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {
  selectedIndex: number = null;
  auth_token = localStorage.getItem('auth_token');
  singleproducts: any;
  message: string;
  allcategories: any;
  products: any;
  sproduct:boolean;
  cat_id: any;
  selectedItem: any;
  defaultproducts: any;
  loading = true;
  d = true;
  p = false;
  // cat_name = localStorage.getItem('cat_name');
  index:number;
  active = false;
  categories = true;
  globalsearch :boolean;
  searchcategories: any;
  searchval:any;
  searching:boolean;
  constructor(private toastr:ToastrService,private router:Router,private http:HttpClient,private activeroute:ActivatedRoute, private route:Router, private crexinservice:CrexinService) { }

  ngOnInit(): void {
  $(document).ready(function () {
      $(".input").focusin(function () {
        $(".close-btn").addClass("active");
      });

      $(".input").focusout(function () {
        $(".close-btn").removeClass('active');
        $(this).val("");
      });
    })
    if(localStorage.getItem('searchval')!=null){
      this.searchval = localStorage.getItem('searchval');
      this.searching = true;
    }
    this.index = +localStorage.getItem('index'); 
    this.subcategories(this.index,localStorage.getItem('cat_id'),localStorage.getItem('cat_name'));
    if(localStorage.getItem('global_search') === 'true'){
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization',`Bearer ${this.auth_token}`);
      this.http.get<any>('https://superuser.crexin.com/api/searchcategories?category='+localStorage.getItem('searchval'),{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
        console.log(res.categories);
        localStorage.setItem('global_search', 'false');
        if(res.categories.length === 0){
           this.toastr.error(this.message,'No data found',{
          positionClass: 'toast-top-center'
         });
         localStorage.setItem('global_search', 'false');
         this.loading = false;
        }
       else{
        this.searchcategories = res.categories;
        // this.products = res.products;
        localStorage.setItem('global_search', 'false');
        this.globalsearch = true;
        this.categories = false;
        this.loading = false;
       }
      })
    }
    else{
      this.crexinservice.getallcategories().subscribe((res)=>{
        console.log(res.categories);
        this.allcategories = res.categories;
        this.globalsearch = false;
        this.loading = false;
      });
    }
    // this.crexinservice.getallcategories().subscribe((res)=>{
    //   console.log(res.categories);
    //   this.allcategories = res.categories
    //   this.loading = false;
    // })
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/subcategories/'+localStorage.getItem('cat_id'),{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
     console.log(res.subcategories);
     if(res.subcategories.length === 0 || res.subcategories.length === null){
      this.toastr.error(this.message,'No equipments available at this moment',{
        positionClass: 'toast-top-center'
      });
     }
     else{
      this.defaultproducts = res.subcategories;
      console.log(this.defaultproducts)
     }
     this.loading = false;
   },(error)=>{
     console.log(error);
    this.toastr.error(this.message,error.error.message,{
      positionClass: 'toast-top-center'
    });
   })

  }
  // get cat_id(){
  //   return localStorage.getItem('cat_id')
  // }
  get cat_name(){
    return localStorage.getItem('cat_name')
  }
  subcategories(index:number,cat_id:any,name:any){
    // console.log(name)
    this.selectedIndex = index;
    this.selectedItem = name;
    localStorage.setItem('cat_id',cat_id);
    localStorage.setItem('cat_name',name);
    this.cat_id = cat_id;
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/subcategories/'+this.cat_id,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
     console.log(res.subcategories);
     if(res.subcategories.length === 0 || res.subcategories.length === null ){
      this.toastr.error(this.message,'No equipments available at this moment',{
        positionClass: 'toast-top-center'
      });
      // this.products = false;
     }
     else{
      this.products = res.subcategories;
     }
     this.loading = false;
   },(error)=>{
     console.log(error);
    this.toastr.error(this.message,error.error.message,{
      positionClass: 'toast-top-center'
    });
   });
   this.d = false;
   this.p = true;
  }
  singleproduct(id:any){
    localStorage.setItem('sub_id', id);
    this.router.navigate(['/rent/bookingtypeselection']);
    // const headers= new HttpHeaders()
    // .set('content-type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    // .set('Authorization',`Bearer ${this.auth_token}`);
    // this.http.get<any>('https://www.superuser.crexin.com/api/single_equipment?equipment_id='+localStorage.getItem('p_id'),{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
    //   console.log(res);
    //   this.singleproducts = res;
    // });
    // this.single_product = true;
    // this.categorie_products = false;
  }
  search(search_categorie){
    console.log(search_categorie.length);
    if(search_categorie.length == 0){
      this.all_categories();
    }
    // this.searching = true;
    // if(search_categorie.length!=0){
    //   localStorage.setItem('searchval',search_categorie);
    //   this.searching = true;
    // }

    // else{
    //   this.searching = false;
    // }
    if(localStorage.getItem('searchval')==null){
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization',`Bearer ${this.auth_token}`);
      this.http.get<any>(`https://superuser.crexin.com/api/searchsubcategories?categoryid=${localStorage.getItem('cat_id')}&subcategory=${search_categorie}`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
        console.log(res);
        // console.log(res.category);
        // console.log(res.products);
        if(res.subcategories.length === 0 || res.subcategories.length === null){
          this.toastr.error(this.message,'Data not found',{
            positionClass: 'toast-top-center'
          });
        }
        else{
          this.products = res.subcategories;
          this.defaultproducts = res.subcategories;
        }
        // this.products = res.products;
      })      
    }
    if(localStorage.getItem('searchval').length!=0){
      const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>(`https://superuser.crexin.com/api/searchsubcategories?categoryid=${localStorage.getItem('cat_id')}&subcategory=${search_categorie}`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      console.log(res);
      // console.log(res.category);
      // console.log(res.products);
      if(res.subcategories.length === 0 || res.subcategories.length === null){
        this.toastr.error(this.message,'Data not found',{
          positionClass: 'toast-top-center'
        });
      }
      else{
        this.products = res.subcategories;
        this.defaultproducts = res.subcategories;
      }
      // this.products = res.products;
    })
    }
    else{
      this.crexinservice.getallcategories().subscribe((res)=>{
        console.log(res.categories);
        this.allcategories = res.categories;
        this.globalsearch = false;
        this.loading = false;
      });
    }
  }
  all_categories(){
    this.router.navigate(['/rent']);
  }
  removeval(){
    this.router.navigate(['/rent']);
  }
}
