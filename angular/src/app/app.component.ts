import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

const slideDatas = [
  {
    link: 'weather',
    imageUrl: '#F8BBD0',
    describe: '描述详情1'
  },
  {
    link: 'weather',
    imageUrl: '#BBDEFB',
    describe: '描述详情2'
  },
  {
    link: 'weather',
    imageUrl: '#B2DFDB',
    describe: '描述详情3'
  }
];
// commit
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [trigger('slider',[
    state('state-1', style({transform: 'translateX(-100%)'})),
    state('state-2', style({transform: 'translateX(0)'})),
    state('state-3', style({transform: 'translateX(100%)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate('3s ease-in')
    ]),
    transition('* => void', [
      style({transform: 'translateX(100%)'}),
      animate('3s ease-out')
    ])
  ]
  )]
})

export class AppComponent implements OnInit, OnDestroy{
  slideData: object[];
  state: string;
  constructor () {

  }
  ngOnInit():void {
    this.slideData = slideDatas;
    this.state = 'state-1'
  }
  contorlSlide (index) {
    this.state = 'state-' + index;
  }
  ngOnDestroy():void {}
}
