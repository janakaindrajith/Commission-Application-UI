import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banca-officer',
  templateUrl: './banca-officer.component.html',
  styleUrls: ['./banca-officer.component.css']
})
export class BancaOfficerComponent implements OnInit {

  setClickedRow : Function;
  games : [{
    game: string,
    platform : string,
    release : string
}];


  constructor() { 


    this.games = [{
      game : "Deus Ex: Mankind Divided",
      platform: " Xbox One, PS4, PC",
      release : "August 23"
  },
  {
      game : "Amplitude",
      platform: " PS4",
      release : "January 5"
  },
  {
      game : "The Huntsman: Winter's Curse",
      platform: "PS4",
      release : "August 23"
  },
  {
      game : "Resident Evil Zero HD Remaster",
      platform: "Win, PS3, PS4, X360, XBO",
      release : "January 19"
  },
  {
      game : "Lego Marvel's Avengers",
      platform: "Win, X360, XBO, PS3, PS4, PSVita, WiiU, 3DS",
      release : "January 26"
  }];

    this.setClickedRow = function(index){
      this.selectedRow = index;
  }

  }



  
  ngOnInit() {
  }

  

}
