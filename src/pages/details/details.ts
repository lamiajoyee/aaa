import { Component } from '@angular/core';

import { HomePage } from '../home/home';

import { NavController, NavParams } from 'ionic-angular';
import { RestapiService } from '../../providers/restapi-service';
import { RootObject, Image, Section } from '../../models/root-model';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'details.html',
  providers: [RestapiService]
})
export class DetailsPage {
  character: RootObject;	
	characterInfo: Array<RootObject> =[];
	bannerUrl: string;
	title:string;

	sectionHeaders:Array<string>=["Appearance", "Personality and Interests", "Relationships", "In the Anime", "Anime", "Name", "Character Songs", "Trivia"];
	
	constructor(private navController: NavController, private navParams: NavParams, private movieService: RestapiService) {
		this.character = navParams.get('character');
		this.bannerUrl = navParams.get('bannerUrl');
		this.title = navParams.get('title');		
				
		this.movieService.fetchSingleItemDetails(this.character, "id").subscribe(
					data => {
							
							this.characterInfo = data;
							console.log("lol=", data);
							/*this.character = Deserialize(data, RootObject);
							
							for(var char of this.character.sections){
								console.log('lol2=', char["title"]);
							}*/

						},
						err => {
							console.log(err);
						},
						() => console.log('Movie navig Complete')
				);
	}	
}
