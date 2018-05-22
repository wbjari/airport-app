import { Genre } from '../shared/genre.model';

export class Deejay {
  public _id: string;
  public name: string;
  public age: number;
  public description: string;
  public imagePath: string;
  public genres: Genre[];

  constructor(id: string, name: string, age: number, description: string, imagePath: string, genres: Genre[]) {
    this._id = id || '';
    this.name = name || '';
    this.age = age || null;
    this.description = description || '';
    this.imagePath = imagePath || '';
    this.genres = genres || [];
  }
}
