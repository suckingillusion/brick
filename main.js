function $(id){
  return document.getElementById(id);
}

function randomNum(a, b) { //a以上b以下の乱数を返す a,bは整数
  return a + Math.floor(Math.random() * (b - a + 1));
}

const canvas = $('myCanvas');
const ctx = canvas.getContext("2d");
const canvasWidth = 500;
const canvasHeight = 750;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const hyoujiFrame = 50;

const nazohyoujiFrame = 70;

const paddleHeight = 10;
const paddleWidth = 80;
const paddleWidthMin = 30;
const paddleX = (canvas.width - paddleWidth) / 2;
const paddleY = canvas.height - paddleHeight - 20;

const ballRadius = 10;

const ballx = canvas.width / 2; //Ball2でも使用
const bally = canvas.height - 50; //Ball2でも使用
const ballvx = 4;
const ballvy = -4;

const ballv = 2;
const ballmaxv = 9;
const ballkakudo = - Math.PI / 4;
let ballvfuncx = 1; //徐々に早くするための関数に使う


const brickRowCount = 20;
const brickColumnCount = 10;
const brickWidth = 50;
const brickHeight = 25;
const brickPadding = 0;
const brickOffsetTop = 110;
const brickOffsetLeft = 0;
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1, type: 0 };
  }
}

const score = 0;
const lives = 3;

let game = new Game();


function mainLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  game.update();
  requestAnimationFrame(mainLoop);
}

let titleScene = function(flag = 2){
  let newTitle = new Title();
  newTitle.flag = flag;
  newTitle.onenterframe = ()=>{
    
    
    if(newTitle.flag == 0){
      newTitle.objs = [];
      let al = newTitle.frame; //透明度のために使用
      if(al > 1000)al = 1000;
      
      let txt1 = new Text('あなたは18歳以上ですか?',60,200);
      txt1.globalAlpha = al / hyoujiFrame;
      newTitle.add(txt1);
      let txt2 = new Text('はい', 200, 300);
      txt2.globalAlpha = al / hyoujiFrame;
      newTitle.add(txt2);
      let txt3 = new Text('いいえ', 200, 360);
      txt3.globalAlpha = al / hyoujiFrame;
      newTitle.add(txt3);
      if(txt2.isTouched(game.touch)[0] == 'touchstart' && txt2.isTouched(game.touch)[1] == true){
        newTitle.frame = 0;
        newTitle.flag = 2;
      }
      if(txt3.isTouched(game.touch)[0] == 'touchstart' && txt3.isTouched(game.touch)[1] == true){
        newTitle.frame = 0;
        newTitle.flag = 1;
      }
      
    }else if(newTitle.flag == 1){
      if(newTitle.frame <= hyoujiFrame){
        for(let x=0;x<newTitle.objs.length;x++){
          newTitle.objs[x].globalAlpha = (hyoujiFrame - newTitle.frame) / hyoujiFrame;
        }
      }
      if(newTitle.frame > hyoujiFrame){
        newTitle.objs = [];
        let _al = newTitle.frame - hyoujiFrame;
        if(_al > hyoujiFrame)_al = hyoujiFrame;
        let txt4 = new Text('このゲームは18歳以上推奨です。',60,200);
        txt4.globalAlpha =  _al / hyoujiFrame;
        newTitle.add(txt4);
      }
        
    }else if(newTitle.flag == 2){
      if (newTitle.frame <= hyoujiFrame) {
        for (let x = 0; x < newTitle.objs.length; x++) {
          newTitle.objs[x].globalAlpha = (hyoujiFrame - newTitle.frame) / hyoujiFrame;
        }
      }
      if (newTitle.frame > hyoujiFrame) {
        //タイトルの表示
        newTitle.objs = [];
        let _al = newTitle.frame - hyoujiFrame;
        if (_al > hyoujiFrame) _al = hyoujiFrame;
        
        let txt6 = new Text('Hyottoko After', 46, 100, 60);
        let txt6w = txt6.returnWidthAndHeight()[0];
        txt6.x = (canvasWidth - txt6w) / 2;
        txt6.globalAlpha = _al / hyoujiFrame;
        newTitle.add(txt6);
        let txt5 = new Text('ブロック崩し', 60, 80, 20);
        txt5.x = (canvasWidth - txt6w) / 2;;
        txt5.globalAlpha = _al / hyoujiFrame;
        newTitle.add(txt5);
        let txtc = new Text('©2023 同人サークル sucking illusion',200,700,15)
        txtc.globalAlpha = _al / hyoujiFrame;
        newTitle.add(txtc);
        $('nameinput').classList.remove('hidden');
        const rctx = 210;
        const rcty = 340;
        const rctw = 80;
        const rcth = 40;
        let rct = new Rect(rctx,rcty,rctw,rcth,true);
        rct.color = 'skyblue';
        newTitle.add(rct);
        let txt7 = new Text('PLAY',225,352);
        newTitle.add(txt7);
        if(game.touch.x >= rctx && game.touch.x <= rctx + rctw && game.touch.y >= rcty && game.touch.y <= rcty + rcth && game.touch.type == 'touchstart'){
          let word = $('nameinput').value;
          for(let w=0;w<keywords.length;w++){
            if(keywords[w].name === word)newTitle.key = Object.assign({}, JSON.parse(JSON.stringify(keywords[w])));
          }
          if(newTitle.key == 'nothing'){
            
          }else{
            newTitle.frame = 0;
            newTitle.flag = 3;
          }
        }
      }
      
    }else if(newTitle.flag == 3){
      $('nameinput').classList.add('hidden');
      if (newTitle.frame <= hyoujiFrame) {
        for (let x = 0; x < newTitle.objs.length; x++) {
          newTitle.objs[x].globalAlpha = (hyoujiFrame - newTitle.frame) / hyoujiFrame;
        }
      }
      if(newTitle.frame > hyoujiFrame){
        newTitle.objs = [];
        let _al = newTitle.frame - hyoujiFrame;
        if(_al > hyoujiFrame)_al = hyoujiFrame;
        let rct2 = new Rect(0,0,canvasWidth,canvasHeight);
        rct2.color = 'black';
        rct2.globalAlpha = _al / hyoujiFrame;
        newTitle.add(rct2);
      }
      if (newTitle.frame > hyoujiFrame * 2) {
          game.add( brickKuzushiScene(newTitle.key) );
      }
    }
    
  }
  return newTitle;
}

let brickKuzushiScene = function (keyword){
   $('nameinput').value = ''
  let newScene = new Scene(keyword.before,keyword.after);
  newScene.keyword = keyword;
  newScene.nazoTop = keyword.nazo;
  newScene.bricks.addStatusAndType(keyword.brick);
  newScene.addItem(keyword.item);
  newScene.addText(new Text('score:' + score,15,15));
  newScene.addText(new Text('life:' + lives,15,45));
  newScene.addSprite(new Sprite('brickKuzushiHaikei.jpg',0,0));
  newScene.addSprite(new Sprite('brickKuzushiMenu.png',0,0));
  newScene.ball.push(new Ball2());
  newScene.paddle.push(new Rect());
  newScene.onenterframe = ()=>{
    function gameoverTest(){
      newScene.lives = 3;
      newScene.end = true;
    }
    //gameoverTest();
    //↑デバッグ用
    
    //ゲームが終了した場合
    if(newScene.end === true){
      if(newScene.lives == 0){
        //ゲームオーバーの場合
        if(game.touch.type == 'touchstart' && game.touch.x >= 230 && game.touch.x <= 450 && game.touch.y >= 15 && game.touch.y <= 47){
          //コンティニュー
          ballvfuncx　= 1;
          game.add(brickKuzushiScene(newScene.keyword));
        }
        if(game.touch.type == 'touchstart' && game.touch.x >= 230 && game.touch.x <= 450 && game.touch.y >= 65 && game.touch.y <= 97){
          //タイトルへ
          game.add(titleScene(2));
        }
      }else{
        //ゲームクリアした場合
        if (game.touch.type == 'touchstart' && game.touch.x >= 230 && game.touch.x <= 450 && game.touch.y >= 15 && game.touch.y <= 47) {
          //画像の切り替え
          if(newScene.nowpass == 1 && newScene.poseButtonReady == true){
            newScene.afterimg.img.src = newScene.pass[0];
            newScene.nowpass = 0;
            newScene.poseButtonReady = false;
          }else if (newScene.nowpass == 0 && newScene.poseButtonReady == true) {
            newScene.afterimg.img.src = newScene.pass[1];
            newScene.nowpass = 1;
            newScene.poseButtonReady = false;
          }
          
        }
        if (game.touch.type == 'touchstart' && game.touch.x >= 230 && game.touch.x <= 450 && game.touch.y >= 65 && game.touch.y <= 97) {
          //タイトルへ
          game.add(titleScene(2));
        }
      }
    }
    
    //一時停止ボタンの処理
    if(game.touch.type == 'touchstart' && game.touch.x >= canvasWidth - 60 && game.touch.x <= canvasWidth - 10 && game.touch.y >= 10 && game.touch.y <= 60 && newScene.poseButtonReady == true){
      if(newScene.pose == false){
        newScene.pose = true;
        newScene.poseButtonReady = false;
      }else{
        newScene.pose = false;
        newScene.poseButtonReady = false;
      }
    }
    
    if(game.touch.type == 'touchend')newScene.poseButtonReady = true;
    
    //ゲームの開始
    if(game.touch.type == 'touchstart' && game.touch.y > 110 && newScene.pose == false && newScene.start == false)newScene.start = true;
    
    //パドルの操作
    if (game.touch.x > 0 && game.touch.x < canvas.width && game.touch.y > 110 && newScene.pose == false) {
      newScene.paddle[0].x = game.touch.x - newScene.paddle[0].width / 2;
    }
    
    newScene.paddleBekutoruCount++;
    //パドルベクトルの取得
    if(newScene.paddleBekutoruCount >= 2){
      newScene.paddleBekutoruCount = 0;
      newScene.paddleBekutoru = newScene.paddle[0].x - newScene.paddleLastX;
      if(game.touch.type == 'touchstart')newScene.paddleBekutoru = 0; //パドルをtouchstartで移動させた場合はベクトルを0にする
      newScene.paddleLastX = newScene.paddle[0].x;
      //console.log('パドルベクトル:' + newScene.paddleBekutoru);
    }
    
    /*Ball1の場合
    if (newScene.ball[0].x + newScene.ball[0].vx > canvas.width - ballRadius || newScene.ball[0].x + newScene.ball[0].vx < ballRadius) {
      newScene.ball[0].vx = -newScene.ball[0].vx;
      
    }
    if (newScene.ball[0].y + newScene.ball[0].vy < ballRadius) {
      newScene.ball[0].vy = -newScene.ball[0].vy;
    } else if (newScene.ball[0].y + newScene.ball[0].vy > canvas.height - ballRadius - 20) {
      if (newScene.ball[0].x > newScene.paddle[0].x && newScene.ball[0].x < newScene.paddle[0].x + paddleWidth) {
        newScene.ball[0].vy = -newScene.ball[0].vy;
      } else {
        newScene.lives--;
        newScene.objs[1].text = 'life:' + newScene.lives;
        if (!newScene.lives) {
          alert("GAME OVER");
          newScene.lives = lives;
          newScene.ball[0].x = canvas.width / 2;
          newScene.ball[0].y = canvas.height - 30;
          newScene.ball[0].vx = ballvx;
          newScene.ball[0].vy = ballvy;
          newScene.paddle[0].x = (canvas.width - paddleWidth) / 2;
    
        } else {
          newScene.ball[0].x = canvas.width / 2;
          newScene.ball[0].y = canvas.height - 30;
          newScene.ball[0].vx = ballvx;
          newScene.ball[0].vy = ballvy;
          newScene.paddle[0].x = (canvas.width - paddleWidth) / 2;
        }
      }
    } */
    
    //Ball2の場合　反射
    let _kakudo = newScene.ball[0].kakudo;
    let _vx = Math.cos(_kakudo) * newScene.ball[0].v;
    let _vy = Math.sin(_kakudo) * newScene.ball[0].v;
    
    if (newScene.ball[0].x + _vx > canvas.width - newScene.ball[0].radius || newScene.ball[0].x + _vx < newScene.ball[0].radius) {
      newScene.ball[0].kakudo = Math.PI - newScene.ball[0].kakudo;
    
    }
    if (newScene.ball[0].y + _vy < newScene.ball[0].radius + 100) {
      newScene.ball[0].kakudo = -newScene.ball[0].kakudo;
    } else if (newScene.ball[0].y + _vy > canvas.height - newScene.ball[0].radius - 20 - paddleHeight/2 && newScene.ball[0].y < paddleY + paddleHeight / 2) {
      if (newScene.ball[0].x + newScene.ball[0].radius> newScene.paddle[0].x && newScene.ball[0].x - newScene.ball[0].radius < newScene.paddle[0].x + newScene.paddle[0].width && newScene.end == false) {
        //反射角にパドルベクトルを影響させる
        
        //ベクトルを合成し、その角度を求める
        var a = { x: newScene.ball[0].vx + newScene.paddleBekutoru / 2, y: - newScene.ball[0].vy };
        var b = { x: 1, y: 0 };
        
        //内積
        var dot = a.x * b.x + a.y * b.y;
        
        //絶対値
        var absA = Math.sqrt(a.x * a.x + a.y * a.y);
        var absB = Math.sqrt(b.x * b.x + b.y * b.y);
        
        //dot = |a||b|cosθという公式より
        var cosTheta = dot / (absA * absB);
        
        //すでにベクトルがノーマライズされてたら dotのみでいける
        
        //cosθの逆関数
        var theta = Math.acos(cosTheta);  //thetaは0以上π以下
        
        newScene.ball[0].kakudo = Math.PI * 2 - theta;
        //パドルを徐々に短くする
        if(newScene.paddle[0].width > paddleWidthMin)newScene.paddle[0].width--;
        //ボールが巨大化していたら、徐々にもとに戻す
        if(newScene.ball[0].radius > ballRadius)newScene.ball[0].radius--;
        //ボール巨大化アイテムを取っていたなら発動させる
        if(newScene.ballBiggerLv > 0){
          newScene.ball[0].radius = ballRadius+ 2 * newScene.ballBiggerLv;
        }
        newScene.baaBiggerLv = 0;
        //ボールを徐々に早くする
         if(newScene.ball[0] < ballmaxv)newScene.ball[0].v += 1/10;
        //角度を0以上2π未満に変換
        while(newScene.ball[0].kakudo >=2 * Math.PI || newScene.ball[0].kakudo < 0){
          if(newScene.ball[0].kakudo >=2 * Math.PI)newScene.ball[0].kakudo -= 2 * Math.PI;
          if(newScene.ball[0].kakudo < 0)newScene.ball[0].kakudo += 2 * Math.PI;
        }
        //角度が浅くなりすぎないように制限をかける
        if(newScene.ball[0].kakudo < 220 * Math.PI / 180)newScene.ball[0].kakudo = 220 * Math.PI / 180;
        if(newScene.ball[0].kakudo > 320 * Math.PI / 180)newScene.ball[0].kakudo = 320 * Math.PI / 180;
      }
    }else if(newScene.ball[0].y + _vy > canvas.height + newScene.ball[0].radius + 300) {
      if(newScene.end === 'ready'){
        //ゲーム終了後にボールが退場した場合
        newScene.ball[0].stop(5);
        newScene.items = [];
        newScene.end = true;
        newScene.poseButtonReady = true;
      }else{
        newScene.lives--;
        newScene.txts[1].text = 'life:' + newScene.lives;
        if (newScene.lives　== 0) {
          newScene.ball[0].x = ballx;
          newScene.ball[0].y = bally;
          newScene.ball[0].kakudo = ballkakudo;
          //newScene.paddle[0].x = (canvas.width - paddleWidth) / 2;
          newScene.start = false;
          newScene.end = true;
          newScene.poseButtonReady = true;
    
        } else {
          newScene.ball[0].x = ballx;
          newScene.ball[0].y = bally;
          newScene.ball[0].kakudo = ballkakudo;
          //newScene.paddle[0].x = (canvas.width - paddleWidth) / 2;
          newScene.start = false;
        
        }
      }
    }
    
    //brickの衝突判定
    function collisionDetection() {
      let limittimeXhantenYhanten = [100000000,false,false,0,500]; //limittime,xhanten,yhanten,c,r
      
      
      
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          let xhanten = false;
          let yhanten = false;
          const b = newScene.bricks.arr[c][r];
          if (b.status != 0) {
            //brickにおける、ボールと最も近い座標を求める
            let nearx;
            let neary;
            let issokumen = false;
            let iskado = [false,false]; //x軸とy軸
            let limittime = 0; //到達時間。　距離/ball.v*cos(ballの進行方向と線分(ball.x,ball.y)(nearx,neary)のなす角)
            if(newScene.ball[0].x +newScene.ball[0].vx > b.x &&
              newScene.ball[0].x +newScene.ball[0].vx < b.x + brickWidth){
                nearx = newScene.ball[0].x +newScene.ball[0].vx;
                
            }else if(newScene.ball[0].x +newScene.ball[0].vx < b.x){
                nearx = b.x;
                issokumen = true;
                iskado[0] = true;
            }else if(newScene.ball[0].x + newScene.ball[0].vx > b.x + brickWidth){
                nearx = b.x + brickWidth;
                issokumen = true;
                iskado[0] = true;
            }
            if (newScene.ball[0].y  +newScene.ball[0].vy > b.y &&
                newScene.ball[0].y +newScene.ball[0].vy < b.y + brickHeight) {
                neary = newScene.ball[0].y +newScene.ball[0].vy;
            } else if (newScene.ball[0].y +newScene.ball[0].vy < b.y) {
                neary = b.y;
                iskado[1] = true;
            } else if (newScene.ball[0].y +newScene.ball[0].vy > b.y + brickHeight) {
                neary = b.y + brickHeight;
                iskado[1] = true;
            }
            
            //limittimeを求める
            let _kyori = Math.sqrt((newScene.ball[0].x +newScene.ball[0].vx - nearx) * ( newScene.ball[0].x +newScene.ball[0].vx - nearx) +( newScene.ball[0].y +newScene.ball[0].vy - neary) * ( newScene.ball[0].y +newScene.ball[0].vy - neary));
            let _naiseki = newScene.ball[0].vx * (nearx - newScene.ball[0].x) + newScene.ball[0].vy * (neary - newScene.ball[0].y);
            var _absA = Math.sqrt(newScene.ball[0].vx * newScene.ball[0].vx + newScene.ball[0].vy * newScene.ball[0].vy);
            var _absB = Math.sqrt( (nearx - newScene.ball[0].x)  *  (nearx - newScene.ball[0].x)  +  (neary - newScene.ball[0].y)  *  (neary - newScene.ball[0].y) );
            var _cosTheta = _naiseki / (_absA * _absB);
            limittime = _kyori / (newScene.ball[0].v * _cosTheta);
            //limittimeXhantenYhantenに記録されている最短limittimeより長い時間なら、更新しないでcontinueする
            if(limittime > limittimeXhantenYhanten[0])continue;
            
            //xhantanとyhantenを求める
            //ボールと上記の座標の距離がボールの半径以内なら衝突する
            if (
              ( newScene.ball[0].x +newScene.ball[0].vx - nearx) * ( newScene.ball[0].x +newScene.ball[0].vx - nearx) +( newScene.ball[0].y +newScene.ball[0].vy - neary) * ( newScene.ball[0].y +newScene.ball[0].vy - neary) < newScene.ball[0].radius * newScene.ball[0].radius
            ) {
              //角ならballの中心と角との傾きによって変化させる
              //隣接するブロックのatatusが1なら変化させる
              if(iskado[0] == true && iskado[1] == true){
                
                if(nearx == b.x){
                  if(neary == b.y){
                    if(newScene.bricks.arr[c][r - 1].status != 0){
                      xhanten = true;
                    }else if(newScene.bricks.arr[c - 1][r].status != 0){
                      yhanten = true;
                    }else{
                      if( newScene.ball[0].y　<=  newScene.ball[0].x +  b.y - b.x ){
                        yhanten= true;
                      }
                      if(newScene.ball[0].y　>=  newScene.ball[0].x +  b.y - b.x ){
                        xhanten = true;
                      }
                    }
                  }else if(neary == b.y + brickHeight){
                   if(r < brickRowCount - 1){
                     if(newScene.bricks.arr[c][r + 1].status != 0){
                      xhanten = true;
                     }
                    }else if(newScene.bricks.arr[c - 1][r].status != 0){
                      yhanten = true;
                    } else{
                      if(newScene.ball[0].y　<= - newScene.ball[0].x +  b.y + brickHeight + b.x ){
                        yhanten = true;
                      }
                      if(newScene.ball[0].y　>= - newScene.ball[0].x +  b.y + brickHeight + b.x ){
                        xhanten = true;
                      }
                    }
                  }
                }else if(nearx == b.x + brickWidth){
                  if (neary == b.y) {
                    if(newScene.bricks.arr[c][r - 1].status != 0){
                      xhanten = true;
                    }else if(newScene.bricks.arr[c + 1][r].status != 0){
                      yhanten = true;
                    }else{
                      if (newScene.ball[0].y　<= -  newScene.ball[0].x +  b.y + b.x + brickWidth ) {
                        yhanten = true;
                      }
                      if (newScene.ball[0].y　>= -  newScene.ball[0].x +  b.y + b.x + brickWidth ) {
                        xhanten = true;
                      }
                    }
                  } else if (neary == b.y + brickHeight) {
                    if (r < brickRowCount - 1) {
                        if (newScene.bricks.arr[c][r + 1].status != 0) {
                          xhanten = true;
                        }
                    }else if(newScene.bricks.arr[c + 1][r].status != 0){
                      yhanten = true;
                    }else{
                      if (newScene.ball[0].y　<=  newScene.ball[0].x +  b.y + brickHeight - b.x - brickWidth) {
                        yhanten = true;
                      }
                      if (newScene.ball[0].y　>=  newScene.ball[0].x +  b.y + brickHeight - b.x - brickWidth) {
                        xhanten = true
                      }
                    }
                  }
                }
              }else
              //当たったのが側面かどうかで跳ね返り方を変える
              if(issokumen == false){
                yhanten = true;
              }else{
                xhanten = true;
              }
              
              limittimeXhantenYhanten = [limittime,xhanten,yhanten,c,r];
              
             
    
              }
            }
          }
        }//for終了
        //console.log(limittimeXhantenYhanten);
        if(limittimeXhantenYhanten[4] != 500){
          //衝突した場合
          //ボールを早くする
          if(newScene.ball[0].v < ballmaxv)newScene.ball[0].v += 1/10;
          //角度を反転させる
          if (limittimeXhantenYhanten[1] == true) newScene.ball[0].kakudo = Math.PI - newScene.ball[0].kakudo;
          if (limittimeXhantenYhanten[2] == true) newScene.ball[0].kakudo = -newScene.ball[0].kakudo;
        
          if (newScene.bricks.arr[limittimeXhantenYhanten[3]][limittimeXhantenYhanten[4]].type == newScene.bricks.cantype) {
          //ブロックの状態を変更
            newScene.bricks.arr[limittimeXhantenYhanten[3]][limittimeXhantenYhanten[4]].status = 0;
            newScene.bricks.typenokori[newScene.bricks.arr[limittimeXhantenYhanten[3]][limittimeXhantenYhanten[4]].type - 1]--;
        
            //スコア反映
            newScene.scorePlus();
            /*勝利判定はonenterframeの最後に記述。
            if (newScene.score === newScene.bricks.maxscore) {
               alert("YOU WIN, CONGRATULATIONS!");
               document.location.reload();
             }*/
        }
        
      }
      
      
    }
    collisionDetection();
    
    
    //itemの衝突判定
    for(let i=0;i<newScene.items.length;i++){
      if(newScene.items[i].num == 0)continue;
      //itemにおける、ボールと最も近い座標を求める
      let nearx;
      let neary;
      let b = newScene.items[i];
      if (newScene.ball[0].x > b.x &&
        newScene.ball[0].x  < b.x + b.width) {
        nearx = newScene.ball[0].x;
      } else if (newScene.ball[0].x  < b.x) {
        nearx = b.x;
      } else if (newScene.ball[0].x  > b.x + b.width) {
        nearx = b.x + b.width;
      }
      if (newScene.ball[0].y  > b.y &&
        newScene.ball[0].y < b.y + b.height) {
        neary = newScene.ball[0].y ;
      } else if (newScene.ball[0].y  < b.y) {
        neary = b.y;
      } else if (newScene.ball[0].y  > b.y + b.height) {
        neary = b.y + b.height;
      }
      
      //ボールと上記の座標の距離がボールの半径以内なら衝突する
      if (
        (newScene.ball[0].x - nearx) * (newScene.ball[0].x - nearx) + (newScene.ball[0].y - neary) * (newScene.ball[0].y - neary) < newScene.ball[0].radius * newScene.ball[0].radius
      ) {
        let itemnum = newScene.items[i].num;
        if(itemnum == 1){
          //life追加
          newScene.lifePlus(newScene.items[i].lv);
          newScene.items[i].lv = 0;
        }else if(itemnum == 2){
          //ボール拡張予約　その場で大きくするとめり込む恐れがある
          //newScene.ball[0].radius += 5 * newScene.items[i].lv;
          newScene.ballBiggerLv += newScene.items[i].lv; //既に予約があったらlvを合算する
          
        }else if(itemnum == 3){
          //パドル延伸
          newScene.paddle[0].width += 5 * newScene.items[i].lv;
          newScene.items[i].lv = 0;
        }else if(itemnum == 4){
          //ランダム除去
          let ntype = newScene.bricks.cantype;
          let kouho = [];
          let lv = newScene.items[i].lv;
          for(let _c=0;_c<newScene.bricks.arr.length;_c++){
            for(let _r=0;_r<newScene.bricks.arr[_c].length;_r++){
              if(newScene.bricks.arr[_c][_r].type == ntype && newScene.bricks.arr[_c][_r].status != 0){
                kouho.push([_c,_r]);
              }
            }
          }
          if(lv > kouho.length)lv = kouho.length - 1;
           //kouhoからランダムにlv個残す
          for(let h=kouho.length - lv;h>0;h--){
            let ran = randomNum(0,kouho.length - 1);
            kouho.splice(ran,1);
          }
          //kouhoのbrickのstatusを0にする
          for(let k=0;k<kouho.length;k++){
            newScene.bricks.arr[kouho[k][0]][kouho[k][1]].status = 0;
            newScene.bricks.typenokori[ntype - 1]--;
            newScene.scorePlus();
          }
          newScene.items[i].lv = 0;
        }
        newScene.ball[0].stop(30);
        newScene.items[i].num = 0;
        
      }
      
      
    }
    //勝利判定
    let iswin = true;
    for (let _c = 0; _c < newScene.bricks.arr.length; _c++) {
      for (let _r = 0; _r < newScene.bricks.arr[_c].length; _r++) {
        if ( newScene.bricks.arr[_c][_r].status != 0) {
          iswin = false;
        }
      }
    }
    if(iswin == true && newScene.end === false){
      //alert("YOU WIN, CONGRATULATIONS!");
      newScene.nazoFrame = nazohyoujiFrame;
      newScene.end = 'ready';
      //document.location.reload();
      
    }
    
    
  }; //onenterframeのオーバーライド終了
  return newScene;
}



//game.add(brickKuzushiScene());
game.add(titleScene());
mainLoop();

function viewportSet() {
  var ww = window.innerWidth;
  var wh = window.innerHeight;
  
  var cw = canvas.width
  var ch = canvas.height
  
  if (ww/wh >= cw/ch) {
    // windowのwidthが長い
    document.querySelector("meta[name='viewport']").setAttribute("content", "width=" + (cw + (ww - wh*cw/ch)*ch/wh  ) );
  } else {
    // それ以外
    document.querySelector("meta[name='viewport']").setAttribute("content", "width=" + ch);
  }
}
window.addEventListener("DOMContentLoaded", viewportSet, false);
window.addEventListener("resize", viewportSet, false);
window.addEventListener("orientationchange", viewportSet, false);
window.addEventListener('devtoolschange', event => {
  
    window.location.replace('https://www.donotusedevtoolplease.com/');
  
});
