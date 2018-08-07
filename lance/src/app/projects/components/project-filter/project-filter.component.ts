import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent {
  @Input()
  categories: Category[];

}
