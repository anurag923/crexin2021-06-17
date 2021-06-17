import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderconfirmation',
  templateUrl: './orderconfirmation.component.html',
  styleUrls: ['./orderconfirmation.component.css']
})
export class OrderconfirmationComponent implements OnInit {
  booked_id = sessionStorage.getItem('booked_id');
  constructor() { }

  ngOnInit(): void {
  }

}
