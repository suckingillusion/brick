class Scene{
  constructor(beforeimg,afterimg){
    this.keyword;
    this.frame = 0;
    
    this.pass = [beforeimg,afterimg];
    this.nowpass = 1;
    
    this.nazoTop = 110; //謎の光spriteのtop
    this.nazoFrame = 0;
    
    this.imgs = []; //[0]背景,[1]上部の枠
    this.afterimg = new Sprite(afterimg,0,110);
    this.items = [new Item(1,19,1),new Item(3,19,2,5),new Item(7,17,3,3),new Item(9,18,4,1),new Item(9,19,4,1)];
    this.txts = [];
    this.ball = [];
    this.paddle = [];
    
    this.score = score;
    this.lives = lives;
    
    this.paddleBekutoru = 0;
    this.paddleBekutoruCount = 0; //一定時間ごとに移動距離を計るためのカウント
    this.paddleLastX = paddleX; //一定時間前のx座標を記録
    
    this.bricks = new Bricks(beforeimg);
    
    this.ballBiggerLv = 0; //item効果
    
    this.start = false; //画面をtouchendしたらスタートする
    this.end = false;
    this.pose = false;
    this.poseButtonReady = true; 
  }
  
  addSprite(sprobj) {
    this.imgs.push(sprobj);
  }
  
  addText(txtobj){
    this.txts.push(txtobj);
  }
  
  addItem(itemObjsArr){
    
    this.items = [];
    for(let x=0;x<itemObjsArr.length;x++){
      let ob = Object.assign(new Item(), JSON.parse(JSON.stringify(itemObjsArr[x] )));;
      //console.log(ob);
     this.items.push( ob );
    }
    //console.log(this.items);
  }
  
  scorePlus(n =1){
    this.score += n;
    this.txts[0].text = 'score:' +this.score;
  }
  
  lifePlus(n =1){
    this.lives += n;
    this.txts[1].text = 'life:' +this.lives;
  }
  
  update(){
    this.onenterframe();
    
     this.imgs[0].update();
     
     this.afterimg.update();
     
     for (let x = 0; x < this.items.length; x++) {
       if(this.end === true || this.end === 'ready')continue;
       this.items[x].update();
     }
     
     this.imgs[1].update();
     
    for(let x=0;x<this.txts.length;x++){
      this.txts[x].update();
    }
    for (let x = 0; x < this.ball.length; x++) {
      if(this.start == false)this.ball[x].stop(5);
      if(this.pose == true)this.ball[x].stop(5);
      if(this.end === true)continue;
      this.ball[x].update();
    }
    for (let x = 0; x < this.paddle.length; x++) {
      if(this.end === true || this.end === 'ready')continue;
      this.paddle[x].update();
    }
    this.bricks.update();
    
    //一時停止ボタン関連
    if (this.pose == false && this.end == false) {
      let icon = new Sprite('stopicon.png', canvasWidth - 50 - 10, 10);
      icon.update();
    }else if(this.pose == true && this.end == false){
      let icon = new Sprite('restarticon.png', canvasWidth - 50 - 10, 10);
      icon.update();
    }
    
    //謎の光
    if( ( this.bricks.cantype == this.bricks.lasttype && ( this.end === false || this.lives == 0) ) || this.end === 'ready' ){
      if(this.end != 'ready' && this.nazoFrame < nazohyoujiFrame){
        this.nazoFrame++;
      }else{
        this.nazoFrame--;
      }
      let gl = this.nazoFrame / nazohyoujiFrame;
      if(gl > 1)gl = 1;
      if(gl <0)gl = 0;
      let hikari = new Sprite('nazonohikari.png',0,this.nazoTop);
      hikari.globalAlpha = gl;
      hikari.update();
      let hikari2 = new Sprite('nazonohikari.png', 0, this.nazoTop + 1);
      hikari2.globalAlpha = gl;
      hikari2.update();
      let hikari3 = new Sprite('nazonohikari.png', 0, this.nazoTop - 1);
      hikari3.globalAlpha = gl;
      hikari3.update();
      let hikari4 = new Sprite('nazonohikari.png', 0, this.nazoTop + 3);
      hikari4.globalAlpha = gl;
      hikari4.update();
      let hikari5 = new Sprite('nazonohikari.png', 0, this.nazoTop - 3);
      hikari5.globalAlpha = gl;
      hikari5.update();
    }
    
    //ゲーム終了後
    if(this.end === true){
      if(this.lives == 0){
        //ゲームオーバーの場合
        let rct1 = new Rect(230,15,220,32,true);
        rct1.color = 'skyblue';
        rct1.update();
        let txt1 = new Text('→コンティニュー',240,20,25);
        txt1.update();
        let rct2 = new Rect(230, 65, 220, 32, true);
        rct2.color = 'skyblue';
        rct2.update();
        let txt2 = new Text('→タイトルへ',240,70,25);
        txt2.update();
        let txt3 = new Text('ゲームオーバー!!', 12, 80);
        txt3.update();
      }else{
        //ゲームクリアした場合
        let rct1 = new Rect(230, 15, 220, 32, true);
        rct1.color = 'skyblue';
        rct1.update();
        let txt1 = new Text('画像を切り替える', 240, 20, 25);
        txt1.update();
        let rct2 = new Rect(230, 65, 220, 32, true);
        rct2.color = 'skyblue';
        rct2.update();
        let txt2 = new Text('→タイトルへ', 240, 70, 25);
        txt2.update();
        let txt3 = new Text('ゲームクリア!!', 12, 80);
        txt3.update();
        
      }
    }
    
    //最初のhyoujiFrameフレームはフェードインする
    if(this.frame < hyoujiFrame){
      this.frame++
      let rct2 = new Rect(0, 0, canvasWidth, canvasHeight);
      rct2.color = 'black';
      rct2.globalAlpha = (hyoujiFrame - this.frame) / hyoujiFrame;
      rct2.update();
    }
  }
  
  onenterframe() {}
}



class Sprite {
  constructor(imgpass = 'test.png', x = 0, y = 0) {
    this.img = new Image();
    this.img.src = imgpass;
    this.x = x;
    this.y = y;
    this.hidden = false;
    this.vx = this.vy = 0; //移動速度
    this.globalAlpha = 1;

  }

  update() {
    if (this.hidden == false) {
      this.onenterframe();
      this.render();
      

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  render() {
    ctx.beginPath();
    ctx.globalAlpha = this.globalAlpha;
    ctx.drawImage(this.img, this.x, this.y);
    ctx.closePath();

  }

  onenterframe() {}

}

class Ball {
  constructor() {
    this.x = ballx;
    this.y = bally;
    this.hidden = false;
    this.vx = ballvx;
    this.vy = ballvy; //移動速度
    this.globalAlpha = 1;

  }

  update() {
    if (this.hidden == false) {
      this.onenterframe();
      this.render();
      

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  render() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

  }

  onenterframe() {}

}

class Ball2 {
  constructor() {
    this.x = ballx;
    this.y = bally;
    this.v = ballv;
    this.vx;
    this.vy;
    this.kakudo = ballkakudo;
    this.radius = ballRadius;
    this.hidden = false;
    this.globalAlpha = 1;
    
    this.stopframe = 0; //止めたいframe数を入れる

  }

  update() {
    if (this.hidden == false) {
      
      this.onenterframe();
      this.render();

      if (this.stopframe > 0) {
        this.stopframe--;
      }else{
        this.x += Math.cos(this.kakudo) * this.v;
        this.y += Math.sin(this.kakudo) * this.v;
      }
    }
  }

  render() {
    this.sansyutu();
    
    ctx.beginPath();
    ctx.globalAlpha = this.globalAlpha;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

  }
  
  sansyutu(){
    this.vx = this.v * Math.cos(this.kakudo);
    this.vy = this.v * Math.sin(this.kakudo);
  }
  
  stop(framenum){
    this.stopframe = framenum;
  }

  onenterframe() {}

}

class Rect {
  constructor(x = paddleX,y = paddleY,width = paddleWidth,height = paddleHeight,doesneedWaku = true) {
    this.x = x;;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hidden = false;
    this.vx = 0;
    this.vy = 0; //移動速度
    this.globalAlpha = 1;
    this.color = "#0095DD";
    this.waku = doesneedWaku;
  }

  update() {
    if (this.hidden == false) {
      this.onenterframe();
      this.render();


      this.x += this.vx;
      this.y += this.vy;
    }
  }

  render() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width,this.height);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.globalAlpha;
    ctx.fill();
    if(this.waku == true){
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.closePath();
    

  }

  onenterframe() {}

}

class Item{
  constructor(c,r,itemnum,lv = 1){
    this.num = itemnum;
    let col = ['red','yellow','blue','purple'];
    this.color = col[itemnum - 1];
    this.x = brickOffsetLeft + c * brickWidth; //これはbrick.x
    this.x += brickWidth * 1/10;
    this.y = brickOffsetTop + 0 + r * brickHeight; //これはbrick.y
    this.y += brickHeight * 1/10;
    this.width = brickWidth * 4/5;
    this.height = brickHeight * 4/5;
    
    this.lv = lv; //lvによって効果量が変わる。
    
  }
  
  update(){
    if(this.num == 0)return;
    this.render();
  }
  
  render(){
    let b1 = new Rect(this.x,this.y,this.width,this.height,false);
    b1.globalAlpha = 0.5;
    b1.color = this.color;
    b1.update();
    
    let b2 = new Rect(this.x - brickWidth, this.y - brickHeight, this.width + brickWidth *2, this.height + brickHeight *2,false);
    b2.globalAlpha = 0.2;
    b2.color = this.color;
    b2.update();
    
    let lvtxt = new Text(0,0,15);
    lvtxt.text = 'Lv' + this.lv;
    lvtxt.color = 'white';
    let txtwWidthAndHeight = lvtxt.returnWidthAndHeight();
    lvtxt.x = this.x + (this.width - txtwWidthAndHeight[0]) / 2;
    lvtxt.y = this.y + (this.height - txtwWidthAndHeight[1]) / 2;
    lvtxt.update();
    }
  
  
}

class Bricks {
  constructor(imgpass = 'test.png'){
    this.typenum = [brickColumnCount * brickRowCount,0,0,0,0];
    this.typenokori = [brickColumnCount * brickRowCount,0,0,0,0]; //こっちは減らしていく
    this.cantype = 1; //現在消せるのはtypeいくつ?
    //type1がすべて消されないとtype2は消えない。typenokori.lengthを増やせばtype数を増やせる。
    this.lasttype = 2; //最終局面でギミックを追加するため、最終typeがいくつなのか記録
    
    this.arr = [];
    for (let c = 0; c < brickColumnCount; c++) {
      this.arr[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        this.arr[c][r] = { x: brickOffsetLeft + c * brickWidth,
                            y: brickOffsetTop + 0 + r * brickHeight,
                            status: 1,
                            type:1 };
      　if(r<19){
      　  this.arr[c][r].type = 2;
      　  this.typenum[0]--;
      　  this.typenokori[0]--;
      　  this.typenum[1]++;
      　  this.typenokori[1]++;
      　}
      }
    }
    
    this.img = new Image();
    this.img.src = imgpass;
    
    this.frame = 0; //光らせるためのフレーム
    
    this.maxscore = brickColumnCount * brickRowCount;
    
    
  }
  
  addStatusAndType (array){
    let _maxscore = 0;
    this.lasttype = 0;
    this.typenum = [0,0,0,0,0];
    this.typenokori = [0,0,0,0,0];
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        this.arr[c][r].status = array[c][r].status;
        this.arr[c][r].type   = array[c][r].type;
        //console.log(c + ',' + r);
        if(array[c][r].status != 0){
          _maxscore++;
          this.typenum[this.arr[c][r].type - 1]++;
          this.typenokori[this.arr[c][r].type -1]++;
          if(this.lasttype < array[c][r].type)this.lasttype = array[c][r].type;
        }
      }
    }
    this.maxscore = _maxscore;
  }
  
  update(){
    this.render();
    this.onenterframe();
    
  }
  
  render(){
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        let _x = this.arr[c][r].x;
        let _y = this.arr[c][r].y;
        let _status = this.arr[c][r].status;
        if(_status != 0){
          ctx.beginPath();
          ctx.globalAlpha = 1;
          ctx.drawImage(this.img, _x, _y - brickOffsetTop - 0,brickWidth,brickHeight,_x,_y,brickWidth,brickHeight);
          ctx.closePath();
          let rct = new Rect(_x,_y,brickWidth,brickHeight);
          rct.globalAlpha = 0.4;
          rct.color = 'gray';
          rct.update();
        }
      }
    }
  }
  
  onenterframe() {
    //消せるtypeを更新
    if(this.typenokori[this.cantype - 1] <= 0){
      this.cantype++;
    }
    
    //光るアニメーションの処理
    const _1frame = 9;
    const loopframe = 150;
    this.frame++;
    if(this.frame > loopframe){
      this.frame = 1;
    }
    
    
    if(this.frame >= loopframe - _1frame * 8 && this.frame <= loopframe){
      let f = this.frame;
      let num;
      if(f >=loopframe - _1frame * 8 && f <loopframe - _1frame * 7){num = 1;}
      else if(f >=loopframe - _1frame * 7 && f <loopframe - _1frame * 6){num = 2;}
      else if(f >=loopframe - _1frame * 6 && f <loopframe - _1frame * 5){num = 3;}
      else if(f >=loopframe - _1frame * 5 && f <loopframe - _1frame * 4){num = 4;}
      else if(f >=loopframe - _1frame * 4 && f <loopframe - _1frame * 3){num = 5;}
      else if(f >=loopframe - _1frame * 3 && f <loopframe - _1frame * 2){num = 6;}
      else if(f >=loopframe - _1frame * 2 && f <loopframe - _1frame * 1){num = 7;}
      else if(f >=loopframe - _1frame * 1 && f <=loopframe){num =8;}
      let _img = new Image();
      _img.src = 'light' + num + '.png';
      
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          let _x = this.arr[c][r].x;
          let _y = this.arr[c][r].y;
          let _status = this.arr[c][r].status;
          let _type = this.arr[c][r].type;
          if (_status != 0 && _type == this.cantype) {
            
            ctx.beginPath();
            ctx.globalAlpha = 0.5;
            ctx.drawImage(_img, _x, _y);
            ctx.closePath();
          }
        }
      }
    }
    
    
  }
}
