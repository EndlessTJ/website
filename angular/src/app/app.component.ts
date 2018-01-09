import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, AnimationEvent } from '@angular/animations';

const slideDatas = [
  {
    link: 'weather',
    imageUrl: '#F8BBD0',
    describe: '描述详情1',
  },
  {
    link: 'weather',
    imageUrl: '#BBDEFB',
    describe: '描述详情2',
  },
  {
    link: 'weather',
    imageUrl: '#B2DFDB',
    describe: '描述详情3',
  },
  {
    link: 'weather',
    imageUrl: '#df801c',
    describe: '描述详情4',
  }
];
// commit
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slider', [
      state('off', style({
        transform: 'translateX(100%) scale(.8)',
        zIndex: '0'
      })),
      state('prev', style({
        transform: 'translateX(-100%) scale(.8)',
        zIndex: '1'
      })),
      state('next', style({
        transform: 'translateX(100%) scale(0.8)',
        zIndex: '2'
      })),
      state('on', style({
        transform: 'translateX(0) scale(1.1)',
        zIndex: '3'
      })),
      transition('void => *', [
        // style({transform: 'translateX(-100%)'}),
        animate('1.5s 2s linear')
      ]),
      transition('* => void', [
        animate('1.5s 2s linear')
      ]),
      transition('on => prev', [
        style({transform: 'translateX(-100%)'}),
        animate('1.5s 2s linear')
      ]),
      transition('prev => on', [
        style({transform: 'translateX(0)'}),
        animate('1.5s 2s linear')
      ]),
      transition('on => next', [
        animate('1.5s 2s linear', style({transform: 'translateX(100%)'}))
      ]),
      transition('next => on', [
        style({transform: 'translateX(0)'}),
        animate('1.5s 2s linear')
      ]),
      transition('off => on', [
        style({transform: 'translateX(0)'}),
        animate('1.5s 2s linear')
      ]),
      transition('on => off', [
        style({transform: 'translateX(100%)'}),
        animate('1.5s 2s linear')
      ])
    ]),
    trigger('toastfadein', [
      state('shoin', style({
        transform: 'scale(0)'
      })),
      transition('void => *', [
        animate('4s', keyframes([
          style({opacity: '0', transform: 'scale(0)', offset: 0}),
          style({opacity: '.8', transform: 'scale(.5)', offset: 0.05}),
          style({opacity: '1', transform: 'scale(1)', offset: 0.1}),
          style({opacity: '1', transform: 'scale(1)', offset: 0.9}),
          style({opacity: '.8', transform: 'scale(.5)', offset: 0.95}),
          style({opacity: '0', transform: 'scale(0)', offset: 1}),
        ]))
      ])
    ])
  ]
})

export class AppComponent implements OnInit, OnDestroy {
  slideData: any;
  toastShow: boolean;
  controlCount: number;
  controlFlag: boolean;
  timing: string;
  constructor () {
    slideDatas.forEach((val, ind) => {
      slideDatas[ind]['order'] = ind;
    });
    this.timing = '1.5s 2s linear';
  }
  ngOnInit(): void {
    this.slideData = slideDatas;
    this.toastShow = false;
    this.controlCount = 0;
    this.controlFlag = false;
  }
  ngOnDestroy(): void {}
  public imageState(ind: number) {
    if (this.slideData && this.slideData.length) {
      return ind === 0 ? 'on' :
        ind === 1 ? 'next' :
        ind === this.slideData.length - 1 ? 'prev' : 'off';
    }
  }
  public animationStarted(event: AnimationEvent) {
    if (event.toState === 'on') {
    }
  }
  public animateDone(event: AnimationEvent) {
    if (event.toState === 'on') {
      this.controlFlag = true;
      // this.slideData.unshift(this.slideData.splice(this.slideData.length - 1, 1)[0]);
      /*if (this.controlCount < 4) {
        this.controlCount ++;
      }else {
        this.controlCount = 1;
      }*/
    }
  }
  public slideIn(ind: number) {
    if (this.controlFlag && (this.slideData[0].order !== ind)) {
      this.controlFlag = false;
      this.slideData.forEach((val, i) => {
        if (val.order === ind) {
          const arr = this.slideData.splice(i);
          this.slideData = arr.concat(this.slideData);
        }
      });
      console.log(this.slideData);
    }
  }
  public slideOut (ind: number) {
    // console.log(ind);
  }
  public showToast() {
    this.toastShow = true;
  }
  public toastHide(event: AnimationEvent) {
    this.toastShow = false;
  }
}
