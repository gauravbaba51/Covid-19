import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent implements OnInit {

  @Input() stat;

  constructor() { }

  ngOnInit() {
    console.log(this.stat)
  }

}
