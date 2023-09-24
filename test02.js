
var mainSvg = document.getElementById("mainSvg");
const svgSize = 300;
let updtRate = 50;
let collisonChkTmr = 2;
function createSVGContainer() {
  //svg parameters
  mainSvg.style.backgroundColor = "#000000";
  mainSvg.style.position = "absolute";
  mainSvg.style.left = 0;
  mainSvg.style.top = 0;
  mainSvg.style.width = svgSize;
  mainSvg.style.height = svgSize;
}
// creates svg container right away as soon as js script runs.
createSVGContainer();

class ball {
  constructor(ballNo) {
    this.r = this.randNumGenrator(5, 5);
    this.x = this.randNumGenrator(this.r, (svgSize / 2) - this.r);
    this.y = this.randNumGenrator(this.r, (svgSize / 2) - this.r);
    this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.myInterval = setInterval(this.myTimerFunc.bind(this), updtRate);
    this.createCircle();
    this.xVel = this.randNumGenrator(-2,3)/updtRate;
    this.yVel = this.randNumGenrator(-2,3)/updtRate;
    this.collStatusArr = [];// keeps track of all the balls that are colliding with this one.
    this.ballNo = ballNo; // ball class instance (object/individual ball number)
  }
  xCorr() {
    return svgSize / 2 + this.x;
  }
  yCorr() {
    return svgSize / 2 - this.y;
  }
  radConvrt(th) {
    return (th * Math.PI) / 180;
  }
  randNumGenrator(minLim, maxLim) {
    return minLim + Math.floor(Math.random() * (maxLim - minLim));
  }
  createCircle() {
    this.circle.setAttributeNS(null, 'cx', this.xCorr());
    this.circle.setAttributeNS(null, 'cy', this.yCorr());
    this.circle.setAttributeNS(null, 'r', this.r);
    this.circle.setAttributeNS(null, "stroke", `white`);
    this.circle.setAttributeNS(null, "opacity", 1);
    this.circle.setAttributeNS(null, "stroke-width", 1);
    this.circle.setAttributeNS(null, "fill", 'white');
    document.getElementById("mainSvg").appendChild(this.circle);

    this.text.setAttributeNS(null, 'x', this.xCorr());
    this.text.setAttributeNS(null, 'y', this.yCorr());
    this.text.setAttributeNS(null, "fill", 'black');
    this.text.textContent = this.ballNo;// check this once more
    document.getElementById('mainSvg').appendChild(this.text);
  }
  myTimerFunc() {
    //xMotion control
    if (this.x <= this.r - (svgSize / 2)) {
      if (this.xVel < 0) {
        this.xVel = -1 * this.xVel;
      }
    }
    if (this.x >= (svgSize / 2) - this.r) {
      this.xVel = -1 * this.xVel;
    }
    //update ball's X position based on current speed in X direction
    this.x = this.x + this.xVel * updtRate;

    //yMotion control
    if (this.y <= this.r - (svgSize / 2)) {
      if (this.yVel < 0) {
        this.yVel = -1 * this.yVel;
      }
    }
    if (this.y >= (svgSize / 2) - this.r) {
      this.yVel = -1 * this.yVel;
    }
    //update ball's y position based on current speed in Y direction
    this.y = this.y + this.yVel * updtRate;
    this.circle.setAttributeNS(null, 'cx', this.xCorr());
    this.circle.setAttributeNS(null, 'cy', this.yCorr());
    // this.text.setAttributeNS(null, 'x', this.xCorr() - this.r / 2);
    // this.text.setAttributeNS(null, 'y', this.yCorr() + this.r / 2);
  }
}
// ball objects Creation 
let noOfBalls = 30;
const balls = [];// 
for (var i = 0; i < noOfBalls; i++) {
  balls.push(new ball(i));
}

// re-calculate speed of ball when it hits other ball.
// checks for initial x and y valocity of both balls and updates them on basis of their sizes(mass/radius)
function updateSpdAtImpact(ball01, ball02) {
  var m1 = ball01.r;
  var m2 = ball02.r;
  // var angAlpha = Math.asin((ball02.y - ball01.y) / (ball02.r + ball01.r));
  // var u1X = ball01.xVel;
  // var u1Y = ball01.yVel;
  // var u2X = ball02.xVel;
  // var u2Y = ball02.yVel;

  // // inline calculations 
  // var u1Il = u1X * Math.cos(angAlpha) + u1Y * Math.sin(angAlpha);
  // var u2Il = u2X * Math.cos(angAlpha) + u2Y * Math.sin(angAlpha);

  // var v1Il = (u1Il * (m1 - m2) + (2 * m2 * u2Il)) / (m1 + m2);
  // var v2Il = (u2Il * (m2 - m1) + (2 * m1 * u1Il)) / (m1 + m2);

  // var v1X_Il = v1Il * Math.cos(angAlpha);
  // var v1Y_Il = v1Il * Math.sin(angAlpha);
  // var v2X_Il = v2Il * Math.cos(angAlpha);
  // var v2Y_Il = v2Il * Math.sin(angAlpha);

  // // perpendicular velocity components calculations
  // var v1X_Pc = u1X * Math.sin(angAlpha) * Math.sin(angAlpha) + u1Y * Math.cos(angAlpha) * Math.sin(angAlpha);
  // var v1Y_Pc = u1Y * Math.cos(angAlpha) * Math.cos(angAlpha) + u1X * Math.cos(angAlpha) * Math.sin(angAlpha);
  // var v2X_Pc = u2X * Math.sin(angAlpha) * Math.sin(angAlpha) + u2Y * Math.cos(angAlpha) * Math.sin(angAlpha);
  // var v2Y_Pc = u2Y * Math.cos(angAlpha) * Math.cos(angAlpha) + u2X * Math.cos(angAlpha) * Math.sin(angAlpha);


  // ball01.xVel = v1X_Il + v1X_Pc;
  // ball01.yVel = v1Y_Il + v1Y_Pc;
  // ball02.xVel = v2X_Il + v2X_Pc;
  // ball02.yVel = v2Y_Il + v2Y_Pc;

  //original for reference
  var vXi = ((ball01.xVel) * (m1 - m2) + (2 * m2 * ball02.xVel)) / (m1 + m2);
  var vXj = ((ball02.xVel) * (m2 - m1) + (2 * m1 * ball01.xVel)) / (m1 + m2);
  var vyi = ((ball01.yVel) * (m1 - m2) + (2 * m2 * ball02.yVel)) / (m1 + m2);
  var vyj = ((ball02.yVel) * (m2 - m1) + (2 * m1 * ball01.yVel)) / (m1 + m2);
  ball01.xVel = vXi;
  ball02.xVel = vXj;
  ball01.yVel = vyi;
  ball02.yVel = vyj;
}

// collison check and ball direction / velocity update function 
// runs after some set time interval
let myInterval01 = setInterval(myTimerFunc01, collisonChkTmr);
function myTimerFunc01() {
  for (var i = 0; i < balls.length; i++) {
    for (var j = 0; j < balls.length; j++) {
      if (i != j) {
        var ballDist = Math.pow((balls[j].x - balls[i].x), 2) + Math.pow((balls[j].y - balls[i].y), 2);
        ballDist = Math.pow(ballDist, 0.5);
        // check if any two balls are touching each-other
        // when they touch each other distance between their centers = sum of their radius.
        if (ballDist <= balls[i].r + balls[j].r) {
          var tempArr01 = balls[i].collStatusArr.filter(value => {
            return value == balls[j].ballNo;
          });
          var tempArr02 = balls[j].collStatusArr.filter(value => {
            return value == balls[i].ballNo;
          });
          // checking if their previous collison is resolved or not
          if (tempArr01.length == 0 && tempArr02.length == 0) {
            updateSpdAtImpact(balls[i], balls[j]);
            balls[i].collStatusArr.push(balls[j].ballNo);
            balls[j].collStatusArr.push(balls[i].ballNo);
          }
        }
        else {
          // if two balls are far from each other at the time they are checked,
          // then clear collision status between them.

          balls[i].collStatusArr = balls[i].collStatusArr.filter(value => {
            return value != balls[j].ballNo;
          });
          balls[j].collStatusArr = balls[j].collStatusArr.filter(value => {
            return value != balls[i].ballNo;
          });
        }
      }
    }
  }
}











