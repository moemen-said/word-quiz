import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IWord, position } from '../models/word';

import { SharedService } from '../services/shared.service';
import { WordService } from '../services/words.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  username: string = '';
  progress: number = 0;
  words: IWord[] = [];
  currentWordIndex: number = 0;
  currentWord: IWord = { id: 0, pos: position.noun, word: '' };
  score: number = 0;

  @ViewChild('answerBtnsDiv') answerBtnsDiv: any;
  @ViewChild('correctAlert') correctAlert: any;
  @ViewChild('unCorrectAlert') unCorrectAlert: any;

  constructor(
    private sharedService: SharedService,
    private wordService: WordService,
    private router: Router,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    // redirect uset to home page he enter the quiz page directly without writing his name
    if (!this.sharedService.isUser()) this.router.navigate(['/']);
    else {
      // get word list from backend end point
      this.username = this.sharedService.username;
      this.wordService.getWords().subscribe({
        next: (res) => {
          if (res.success) {
            this.words = res.words;
            this.currentWord = this.words[0];
          }
        },
        error: (err) => {
          alert('something went wrong, please try again.');
          this.router.navigate(['/']);
        },
      });
    }
  } // end ngOnInit

  // validate user answer 
  validateAnswer(event: any, type: string) {
    this.disabledAnswerBtns();

    // increment progress variable by 10 acording to currentWordIndex variable 
    this.progress = ((this.currentWordIndex + 1) / this.words.length) * 100;

    // show feedback to user when select answer
    const clickedBtn = event.target;
    if (this.currentWord.pos === type) {
      this.sharedService.incrementScore();
      this.render.addClass(clickedBtn, 'correct');
      this.render.removeClass(this.correctAlert.nativeElement, 'd-none');
    } else {
      this.render.addClass(clickedBtn, 'uncorrect');
      this.render.addClass(clickedBtn, 'animate__headShake');
      this.render.removeClass(this.unCorrectAlert.nativeElement, 'd-none');
    }

    this.handleNextQuestion();
  } // end validateAnswer

  // show next question or direct user to rank page when answer all questions
  handleNextQuestion() {
    if (this.currentWordIndex === this.words.length - 1) {
      setTimeout(() => {
        this.router.navigate(['/result']);
      }, 2000);
    } else {
      setTimeout(() => {
        this.currentWordIndex++;
        this.currentWord = this.words[this.currentWordIndex];
      }, 2000);
      this.clearCorrection();
    }
  } // end handleNextQuestion

  // disable answer buttons when user click answer button
  disabledAnswerBtns() {
    const answerBtns = this.answerBtnsDiv.nativeElement.children;
    for (const btn of answerBtns) {
      btn.disabled = true;
    }
  } // end disabledAnswerBtns

  // hide correction text and return answer buttons to its initial state
  clearCorrection() {
    setTimeout(() => {
      this.render.addClass(this.correctAlert.nativeElement, 'd-none');
      this.render.addClass(this.unCorrectAlert.nativeElement, 'd-none');
      const answerBtns = this.answerBtnsDiv.nativeElement.children;
      for (const btn of answerBtns) {
        btn.disabled = false;
        this.render.removeClass(btn, 'correct');
        this.render.removeClass(btn, 'uncorrect');
        this.render.removeClass(btn, 'animate__headShake');
      }
    }, 2000);
  } // end clearCorrection
}
