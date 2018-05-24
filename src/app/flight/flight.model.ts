export class Flight {
  public _id: string;
  public name: string;
  public date: string;
  public departure: string;
  public arrival: string;
  public location: string;

  constructor(id: string, name: string, date: string, departure: string, arrival: string, location: string) {
    this._id = id || '';
    this.name = name || '';
    this.date = date || '';
    this.departure = departure || '';
    this.arrival = arrival || '';
    this.location = location || '';
  }
}
