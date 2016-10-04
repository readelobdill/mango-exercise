import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

//TODO: add fallback sorting states
@Pipe({name: 'orderTracksBy'})
export class OrderTracksByPipe implements PipeTransform {
    transform(array: any[], sortKey: string, reverse: boolean): any[] {
        let sortedArray = _.sortBy(array, value => _.get(value, sortKey));
        return reverse ? sortedArray.reverse() : sortedArray;
    }
}

//TODO: add "no matches" state
@Pipe({name: 'filterTracks'})
export class FilterTracksPipe implements PipeTransform {
    transform(array: any[], query: string): any[] {
        let regex = new RegExp(query, "i");
        return array.filter(value => regex.test(value.name) || regex.test(value.artists[0].name));
    }
}