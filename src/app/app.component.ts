import { Component } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from "lodash";
//TODO: song preview
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private values: Object[];
    private filterQuery: string = '';
    private isReverse: boolean = true;
    private searchQuery: string = 'man go';
    private sortKey: string = 'popularity';
    private audioPlayer: any = new Audio();

    constructor(private http: Http){
        this.getValues();
        //TODO: rename this?
        this.getValues = _.debounce(this.getValues, 250);
        this.audioPlayer.addEventListener("ended", () => {
            //TODO: this is funky as hell from angular2. it wont update
            //      the template when audioPlayer.ended changes so run an
            //      event handler here to run update cycle?
        });
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
    playPausePreview(url: string){
        if(url === this.audioPlayer.src){
            this.audioPlayer.paused ? this.audioPlayer.play() : this.audioPlayer.pause();
        } else {
            this.audioPlayer.src = url;
            this.audioPlayer.load();
            this.audioPlayer.play();
        }
    }
}