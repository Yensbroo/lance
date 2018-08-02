import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "projectFilter"
})
export class FilterPipe implements PipeTransform {
  transform(items: any, searchText: any): any {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return JSON.stringify(item).includes(searchText);
    });
  }
}
