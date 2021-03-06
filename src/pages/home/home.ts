import { Component, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';
import { RestapiService } from '../../providers/restapi-service';

import { DetailsPage } from '../details/details';
//import { Storage } from '@ionic/storage';
import { RootObject } from "../../models/root-model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  charactersListArray : Array<any> = ["North_Italy", "Germany", "Japan", "America", "England", "France", "China", "Russia"];
	characters : Array<RootObject> =[];
	bannerUrls: Array<string>=[]; 

  constructor(public navCtrl: NavController, public restapiService: RestapiService) {
    this.getItems();
  }

  getItems() {
    this.charactersListArray.forEach((a)=>{
				this.restapiService.getAllCharacters(a).subscribe(
					data => {
							let temp = data;
							for(var id in temp){
                  this.characters.push(temp[id]);
                  this.bannerUrls.push(temp[id].thumbnail);
							}
						},
						err => {
							console.log(err);
						},
						() => console.log('Data fetch Complete')
				);
			})	
  }

  itemTapped(event){ 
		this.navCtrl.push(DetailsPage, {
			characterId: event.id,
			bannerUrl: event.thumbnail,
			title : event.title
		});
  }
}