import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-helpcenter',
  templateUrl: './helpcenter.component.html',
  styleUrls: ['./helpcenter.component.css']
})
export class HelpcenterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
