import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchProjects"
})
export class FilterPipe implements PipeTransform {
  transform(items: any, searchText: any, category: any): any {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return JSON.stringify(item).includes(searchText);
    });
  }
}
