import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userId: string = ''
  profileUrl: string = ''
  groupomaniaUrl: string = ''

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.ngSetUrl()
  }
  
  ngSetUrl() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'],
      this.profileUrl = '../profile?userId='+ this.userId +''
      this.groupomaniaUrl = '../groupomania?userId='+ this.userId +''
    });
  }
}