import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { WordService } from '../services/words.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  username = '';
  rank = 0;
  constructor(
    private sharedService: SharedService,
    private wordService: WordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // redirect uset to home page he enter the quiz page directly without writing his name
    if (!this.sharedService.isUser()) this.router.navigate(['/']);
    else {
      // get rank from backend end point
      this.wordService.getRank(this.sharedService.score).subscribe((res) => {
        this.rank = res.rank;
      });
    }
  }

  // redirect user to home page and reset his username and score
  tryAgain() {
    this.sharedService.username = '';
    this.sharedService.resetScore();
    this.router.navigate(['/']);
  }
}
