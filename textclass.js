class Text{
  constructor(text,x = 0,y = 0,size = 20){
    this.text = text;
    
		this.font = "游ゴシック体, 'Yu Gothic', YuGothic, sans-serif";
		//テキストを表示する位置
		this.x = x;
		this.y = y;
		//数値によってテキストを移動させることができる（移動速度）
		this.vx = this.vy = 0;
		//テキストのベースラインの位置
		this.baseline = 'top';
		//テキストのサイズ
		this.size = size;
		//テキストの色
		this.color = '#000000';
		//テキストの太さ
		this.weight = 'normal';
		
		this._width = 0;
		
		this._height = 0;
		
		this.max= 0; //1行当たりの最大文字数を設定できる。改行される。 
		
		this.globalAlpha = 1;
		
		this.hidden = false;
		
		this.tenmetu = 0;  //1を入れたら点滅する。
  }
  
  update(){
    if(this.hidden || this.tenmetu == 4)return;
    if(this.tenmetu == 1){
      this.tenmetu = 2;
      setTimeout( ()=>{
        if(this.tenmetu !=0)this.tenmetu = 3;
      },1000 / (3/2));
    }
    if (this.tenmetu == 3) {
      this.tenmetu = 4;
      setTimeout(() => {
        if(this.tenmetu != 0)this.tenmetu = 1;
      }, 1000 / 5);
      return;
    }
    
    const _ctx = canvas.getContext('2d');
    _ctx.beginPath();
    
    _ctx.font = this.weight + ' ' + this.size + 'px ' + this.font;
    _ctx.fillStyle = this.color;
    _ctx.textBaseline = this.baseline;
    _ctx.globalAlpha = this.globalAlpha;
    
    this._width = _ctx.measureText(this.text).width;
    this._height = Math.abs(_ctx.measureText(this.text).actualBoundingBoxAscent) + Math.abs(_ctx.measureText(this.text).actualBoundingBoxDescent);
    
    if(this.max > 0){
      let howmanylines = Math.ceil( this.text.length / this.max);
      for(let li=0;li<howmanylines;li++){
        let _texts = this.text.substr(li * this.max,this.max);
        _ctx.fillText( _texts ,this.x,this.y + (this._height + 4)*li);
      }
    }else{
      this.render();
    }
    
    _ctx.closePath();
    
    this.onenterframe();
    
    this.x += this.vx;
    this.y += this.vy;
    
  }
  
  render(){
    if (this.x < -1 * this._width || this.x > canvas.width) return;
    if (this.y < -1 * this._height || this.y > canvas.height + this._height) return;
    //テキストを表示
    ctx.fillText(this.text,this.x,this.y);
  }
  
  onenterframe(){}
  
  touchevent(){}
  
  gethani(){
    const _ctx = canvas.getContext('2d');
    _ctx.beginPath();
    
    _ctx.font = this.weight + ' ' + this.size + 'px ' + this.font;
    _ctx.textBaseline = this.baseline;
    
    this._width = _ctx.measureText(this.text).width;
    this._height = Math.abs(_ctx.measureText(this.text).actualBoundingBoxAscent) + Math.abs(_ctx.measureText(this.text).actualBoundingBoxDescent);
    _ctx.closePath();
    
    return [this.x,this.x + this._width,this.y,this.y + this._height];
  }

  isTouched(touch){
    let t = false;
    if(touch.x >= this.gethani()[0] &&
       touch.x <= this.gethani()[1] &&
       touch.y >= this.gethani()[2] &&
       touch.y <= this.gethani()[3])t=true;
    return [touch.type,t];
    
    //以下だとうまくいかなかった
    /*
    let _relactiveFingerPosition = {
      x: touch.x - this.x,
      y: touch.y - this.y
    };
    
    const inRange = (num,min,max) => {
      const _inRange = (min <= num && num <= max);
      return _inRange;
      
    }
    
    if( inRange(_relactiveFingerPosition.x,0,this._width) && 
        inRange(_relactiveFingerPosition.y,0,this._height))return [touch.touchtyoe,true];
    else return [touch.touchtype,false];
    */
  }
  
  returnWidthAndHeight(){
        const _ctx = canvas.getContext('2d');
        _ctx.beginPath();
    
        _ctx.font = this.weight + ' ' + this.size + 'px ' + this.font;
        _ctx.textBaseline = this.baseline;
    
        this._width = _ctx.measureText(this.text).width;
        this._height = Math.abs(_ctx.measureText(this.text).actualBoundingBoxAscent) + Math.abs(_ctx.measureText(this.text).actualBoundingBoxDescent);
        _ctx.closePath();
        return[this._width,this._height];
  }
}
