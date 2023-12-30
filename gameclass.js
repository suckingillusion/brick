class Game{
  constructor(){
    this.scene = new Scene();
    this.touch = {
      x: 0,
      y: 0,
      type: ''
    }
    
    canvas.addEventListener('touchmove',(event)=>{
      var eventType = event.type;
    
      var x = 0, y = 0;
      const offset = canvas.getBoundingClientRect();

		  x = event.changedTouches[0].pageX;
  		y = event.changedTouches[0].pageY;
  	
      x = x - offset.left - window.pageXOffset;
  	  y = y - offset.top - window.pageYOffset;
  	
    	this.touch.type = eventType;
    	this.touch.x = x;
    	this.touch.y = y;
    	
    });
    
    canvas.addEventListener('touchstart',(event)=>{
      var eventType = event.type;
    
      var x = 0, y = 0;
      const offset = canvas.getBoundingClientRect();

		  x = event.changedTouches[0].pageX;
  		y = event.changedTouches[0].pageY;
  	
      x = x - offset.left - window.pageXOffset;
  	  y = y - offset.top - window.pageYOffset;
  	
    	this.touch.type = eventType;
    	this.touch.x = x;
    	this.touch.y = y;
    	
    });
    
    canvas.addEventListener('touchend',(event)=>{
      var eventType = event.type;
    
      var x = 0, y = 0;
      const offset = canvas.getBoundingClientRect();

		  x = event.changedTouches[0].pageX;
  		y = event.changedTouches[0].pageY;
  	
      x = x - offset.left - window.pageXOffset;
  	  y = y - offset.top - window.pageYOffset;
  	
    	this.touch.type = eventType;
    	this.touch.x = x;
    	this.touch.y = y;
    	
    });
    
    this.states = {};
    
  }
  
  update(){
    
    this.scene.update();
  }
  
  add(scene){
    this.scene = scene;
  }
}


class Title {
  constructor(bgImgPass = 'brickKuzushiHaikei.jpg'){
    this.frame = 0;
    this.flag = 0;
    this.key = 'nothing';
    
    this.objs = [];
    this.bg = new Sprite(bgImgPass);
  }
  
  add(obj){
    this.objs.push(obj);
  }
  
  update(){
    this.bg.update();
    this.frame++;
    this.onenterframe();
    for (let x = 0; x < this.objs.length; x++) {
      this.objs[x].update();
    }
  }
  
  onenterframe(){}
}

