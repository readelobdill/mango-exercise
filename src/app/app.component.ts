import { Component } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from "lodash";
//TODO: sort arrows, preview, style + sass
@Component({
	selector: 'my-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	private values: Object[];
	private filterQuery: string = '';
	private isReverse: boolean = true;
	private searchQuery: string = 'mango';
	private sortKey: string = 'popularity';

	constructor(private http: Http){
		this.getValues();
		this.getValues = _.debounce(this.getValues, 250);
	}
	getValues(){
		if(this.searchQuery){
			let url = `https://api.spotify.com/v1/search?type=track&q=${this.searchQuery}`;
			this.http.get(url).map((response) => response.json()).subscribe(result => {
				this.values = result.tracks.items;
			});
		}
	}
	getReadableDuration(trackMs: number){
		let min = Math.floor(trackMs / 60000);
  		let sec = `0${Math.floor((trackMs % 60000) / 1000)}`.slice(-2);
		return `${min}:${sec}`;
	}
	sortBy(sortKey: string){
		if(!this.isReverse && this.sortKey === sortKey){
			this.isReverse = true;
		} else {
			this.isReverse = false;
			this.sortKey = sortKey;
		}
	}
}