import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GamesService } from 'src/app/core/service/games.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss'],
})
export class GameFormComponent implements OnInit {
  @Input() data: any;
  @Output() formEvent = new EventEmitter<any>();

  formData: any = {
    _id: undefined,
    id: undefined,
    home: {
      id: -1
    },
    away: {
      id: -1
    },
    date: new Date(),
    stadium: undefined,
    oddsHome: undefined,
    oddsAway: undefined,
    oddsDraw: undefined,
    city: undefined,
  };

  teams = [];

  constructor(private service: GamesService) { }

  ngOnInit(): void {
    this.service.getTeams().subscribe((teams) => {
      if (teams) {
        this.teams = teams;
      }
    });

    if (this.data && this.data.ID) {

      this.formData = {
        id: this.data.ID,
        id_api: this.data.ID_API | 0,
        status: this.data.STATUS ? this.data.STATUS : 'NS',
        date: this.data.DATE_MATCH,
        home: {
          id: this.data.ID_HOME
        },
        away:  {
          id: this.data.ID_AWAY
        },
        winner: this.data.ID_WINNER,
        stadium: this.data.STADIUM,
        city: this.data.CITY,
        lng: this.data.LNG | 0,
        lat: this.data.LAT | 0,
        oddsHome: this.data.ODDS_HOME,
        oddsAway: this.data.ODDS_AWAY,
        oddsDraw: this.data.ODDS_DRAW,
      };
    }
  }

  submit(): void {
    console.log('this.formData', this.formData);
    this.formEvent.emit(this.formData);
  }

  cancel(): void {
    this.formEvent.emit(-1);
  }

  changeImage(): void {
    const imageInput: any = document.getElementById('imageInput');
    imageInput.click();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.toBase64(event.target.files[0]).then((base64: any) => {
        this.formData.image = base64;
      });
    }
  }

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
