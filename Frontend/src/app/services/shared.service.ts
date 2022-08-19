import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _username: string = '';
  private _score: number = 0;

  public set username(username: string) {
    this._username = username;
  }

  public get username() {
    return this._username;
  }

  public isUser() {
    return this._username != '';
  }

  public get score() {
    return this._score;
  }

  public incrementScore() {
    this._score += 10;
  }
  
  public resetScore() {
    this._score = 0;
  }
}
