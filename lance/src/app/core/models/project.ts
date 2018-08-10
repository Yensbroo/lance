import { Category } from './category';

export class Project {
  id: String;
  user_id: Number;
  category: Category[];
  project_start: String;
  project_end: String;
  budget: Number;
  title: String;
  body: String;
  deleted_at: String;
  published_at: String;
  created_at: String;
  updated_at: String;
  published: Boolean;
}
