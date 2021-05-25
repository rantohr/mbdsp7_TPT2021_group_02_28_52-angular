import { Component, OnInit } from '@angular/core';
import { Loader, LoaderOptions } from 'google-maps';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initMap()
  }

  async initMap() {

    const loader = new Loader('AIzaSyAxAiM0vkG-sXehYJZOBEVgrTQrsXxcGFo', {});
    const google = await loader.load();

    console.log('google', google);
    
    const map = new google.maps.Map(document.getElementById('map2'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });

    console.log('map', map);

  }
}
