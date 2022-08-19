import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IWord } from '../models/word';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor(private http: HttpClient) {}

  getWords() {
    return this.http.get<{ success: boolean; words: IWord[] }>(
      'http://localhost:3000/words'
    );
  }

  getRank(score: number) {
    return this.http.post<{ success: boolean; rank: number }>(
      'http://localhost:3000/rank',
      {
        score: score,
      }
    );
  }
}
