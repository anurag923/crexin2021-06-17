import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrexinService } from 'src/app/services/crexin.service';

@Component({
  selector: 'app-csidenav',
  templateUrl: './csidenav.component.html',
  styleUrls: ['./csidenav.component.css']
})
export class CsidenavComponent implements OnInit {
  categories: any;

  constructor(private crexinservice:CrexinService, private router:Router) { }

  ngOnInit(): void {
    this.crexinservice.getallcategories().subscribe((res)=>{
      console.log(res);
      this.categories = res
    })
  }

}
