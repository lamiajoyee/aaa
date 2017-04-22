import { Component } from '@angular/core';

import { HomePage } from '../home/home';

import { NavController, NavParams } from 'ionic-angular';
import { RestapiService } from '../../providers/restapi-service';
import { RootObject, Image, Section } from '../../models/root-model';
//import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'details.html',
  providers: [RestapiService]
})

export class DetailsPage {
  	character: RootObject;	
	characterInfo: Array<RootObject> =[];
	bannerUrl: string;
	title:string;
	id:number;

	sectionHeaders:Array<string>=["Appearance", "Personality and Interests", "Relationships", "In the Anime", "Anime", "Name", "Character Songs", "Trivia"];
	
	constructor(private navController: NavController, private navParams: NavParams, private restapiService: RestapiService) {
		this.id = navParams.get('characterId');
		this.bannerUrl = navParams.get('bannerUrl');
		this.title = navParams.get('title');		
			
		this.restapiService.getCharacterDetails(this.id).subscribe(
						data => {		
							for(var i in data){
								this.characterInfo.push(data[i]);
								if(data[i].level==3){
									this.restapiService.getRootObject(this.checkTitle(data[i].title)).subscribe(
											data2 => {
												//this.characterInfo.forEach(x1 => x1.thumbnail = data2.thumbnail);
												for(var i=0;i<this.characterInfo.length;i++){
													if(this.characterInfo[i].title == this.checkTitle(data2.title)){
														this.characterInfo[i].thumbnail=data2.thumbnail;
													}
												}
											},
											err2 => {
												console.log(err2);
											},
											() => console.log(this.characterInfo)
										);
									}
									
								}
								
							},
							err => {
								console.log(err);
							},
							() => console.log('Movie navig Complete')
					);
			}

			checkTitle(ttl:string):string{
				switch(ttl){
					case "Italy": return "North_Italy";
					case "England/UK/Britain": return "England";
					case "Ancient Rome": return "Ancient_Rome";
					case "South Italy (Romano)": return "South_Italy";
					case "South Italy": return "South_Italy";
					case "England/UK/Britain": return "England";
					case "Ancient Rome": return "Ancient_Rome";
					default : return ttl;
				}
				 
			
			}

}
  	

					
				