import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor() { }

  getSubStringWithDash(string_to_sub: string, offset: number)
  {
    const sub_str = string_to_sub.length > offset ? string_to_sub.substring(0, offset-3) + "..." : string_to_sub;

    return sub_str;
  }
}
