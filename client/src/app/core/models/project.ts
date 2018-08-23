import { Category } from "./category";

export class IProject {
  id: String;
  user_id: Number;
  category_id: Number;
  category: Category[];
  project_start: String;
  project_end: number;
  budget: Number;
  title: String;
  body: String;
  deleted_at: String;
  published_at: String;
  created_at: String;
  updated_at: String;
  published: Boolean;
}
