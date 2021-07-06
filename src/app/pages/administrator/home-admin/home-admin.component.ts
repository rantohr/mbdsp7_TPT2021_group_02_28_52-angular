import { Component, OnInit } from '@angular/core';
import { Loader, LoaderOptions } from 'google-maps';
import { GamesService } from 'src/app/core/service/games.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  gamblersByGender: any;
  richestGamblers: any;
  profitPerUser: any;

  loading = false
  
  constructor(private service: GamesService) { }

  ngOnInit(): void {
    this.loading = true
    this.initMap()

    this.service.gamblersByGender().subscribe(res => {
      if (res) {
        this.gamblersByGender = res
        this.loading = false
      }
    })

    this.service.richestGamblers().subscribe(res => {
      if (res) {
        this.richestGamblers = res.slice(0, 5)
      }
    })

    this.service.profitPerUser().subscribe(res => {
      if (res) {
        this.profitPerUser = res.sort((a, b) => b.TOTAL_MONEY - a.TOTAL_MONEY).slice(0, 5)
      }
    })
  }

  async initMap() {

    const loader = new Loader('AIzaSyAxAiM0vkG-sXehYJZOBEVgrTQrsXxcGFo', {});
    const google = await loader.load();

    console.log('google', google);

    const map = new google.maps.Map(document.getElementById('map2'), {
      center: { lat: -30.397, lng: 150.644 },
      zoom: 8,
    });

    console.log('map', map);

  }
}
