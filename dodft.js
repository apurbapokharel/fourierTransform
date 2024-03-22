class Complex{
  constructor(a,b){
    this.re = a;
    this.ig = b;
  }
  
  add(c){
    this.re = c.re + this.re;
    this.ig = c.ig + this.ig;
  }
  
  mul(c){
    let r = c.re * this.re - c.ig * this.ig;
    let i = c.re * this.ig + c.ig * this.re;
    return new Complex(r, i);
  }
}
function dft(x){
  X = [];
  let N = x.length;
  for(let k=0; k<N; k++){
    let sum = new Complex(0,0);
    for(let n=0; n<N; n++){
      let angle = (TWO_PI*k*n)/N;
      let c1 = new Complex(cos(angle), -sin(angle));
      sum.add(x[n].mul(c1));
    }
    //need to avarage it so that it fits the frame
    sum.re = sum.re/N;
    sum.ig = sum.ig/N;
    
    let freq = k;
    let amp = sqrt(sum.re * sum.re + sum.ig * sum.ig);
    let phase = atan2(sum.ig, sum.re);
    X[k] = { re: sum.re, ig: sum.ig, freq, amp, phase };
  }
  return X;
  
}