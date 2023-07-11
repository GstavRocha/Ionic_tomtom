import {Component, OnInit} from '@angular/core';
import tt  from '@tomtom-international/web-sdk-maps';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  map!: any
  constructor() {}

  ngOnInit() {
    this.map = tt.map({
      key: "Lb4TsGDFHoP5ldvIcvjZEkKHPXx88xZk",
      container: "map",
      center: new tt.LngLat(-35.2604, -5.90606 ),
      zoom: 10,
    });
  }
}
