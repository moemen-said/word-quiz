import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Event, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('username') usernameInput: any;
  @ViewChild('warning') warningText: any;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private render: Renderer2
  ) {}

  ngOnInit(): void {}

  onStartBtnClick() {
    this.sharedService.username = this.usernameInput?.nativeElement.value;
    
    if (this.sharedService.isUser()) {
      this.router.navigate(['quiz']);
    } else {
      this.render.removeClass(this.warningText.nativeElement, 'd-none');
      setTimeout(() => {
        this.render.addClass(this.warningText.nativeElement, 'd-none');
      }, 2000);
    }
  }

  onKeyUp(event: any) {
    if (event.key == 'Enter') this.onStartBtnClick();
  }
}
