import { Component, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';
import { RestapiService } from '../../providers/restapi-service';

import { DetailsPage } from '../details/details';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  charactersListArray : Array<any> = ["North_Italy", "Germany", "Japan", "America", "England", "France", "China", "Russia"];
	characters : Array<any> =[];
	bannerUrls: Array<string>=[]; 

  constructor(public navCtrl: NavController, public restapiService: RestapiService, storage: Storage) {
    this.getItems();
  }

  getItems() {
    this.charactersListArray.forEach((a)=>{
				this.restapiService.fetchSingleItem(a).subscribe(
					data => {
							let temp = data.items;
							for(var id in temp){
                  this.characters.push(temp[id]);
                  for(var i=0;i<this.characters.length;i++){
                    if (this.bannerUrls.indexOf(this.characters[i].thumbnail) == -1){
                      this.bannerUrls.push(this.characters[i].thumbnail);
                  }
                }
							}
						},
						err => {
							console.log(err);
						},
						() => console.log('Data fetch Complete')
				);
			})
			console.log(this.bannerUrls);
  }

  itemTapped(event){ 
		this.navCtrl.push(DetailsPage, {
			character: event.id,
			bannerUrl: event.thumbnail,
			title : event.title
		});
  }
}