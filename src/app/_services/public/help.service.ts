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

  generateUniqueKey()
  {
    return `${ Math.random() }_${ new Date().getTime() }`;
  }

  getLetters()
  {
    return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  }

  getLettersToUpperCase()
  {
    return this.getLetters().join(",").toUpperCase().split(",");
  }
}
