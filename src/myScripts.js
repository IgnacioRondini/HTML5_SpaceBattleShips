//"use strict";



globalParameters = {
	initiated: false
};

/*Class Moving object*/

class MovingObject{
    constructor(position, ID, ClassType, speed,angle) {
    this.position = position;
    this.ID = ID;
    this.speed = speed;
    alert("moving object constructor ID:" + ID);
    alert("moving object constructor angle: "+ angle);
    alert("moving object position" + position.left);     
    this.angle = angle;
    this.inertiaAngle = angle;
    this.class = ClassType;
  }
    update(dt){
            alert("update:"+this.ID);
        alert("speed:"+this.speed);
        alert("angle intertia:"+this.inertiaAngle);
        alert("dt:" + dt);
        var dx = this.speed*dt*Math.cos(this.inertiaAngle)*.1;
        var dy = this.speed*dt*Math.sin(this.inertiaAngle)*.1;    
        var left = parseFloat(this.position.left) + dx;
        alert("this.position.left update before "+ this.position.left);
        alert("dx:"+dx);
        alert("left:" +left);
        var top = parseFloat(this.position.top) + dy;
        this.position.left = left + "px";
        alert("this.position.left ipdate after "+ this.position.left);
        this.position.top = top + "px";
        
    }
    
    updateView(){
        var container = $('#container');
        var element = $('#'+this.ID);
        
        //Check if already on container
        if(element.length ==0){
        // add bullet
            container.append('<div id='+this.ID+ ' class = '+ this.class + '></div>');    
            element = $("#" + this.ID);
        }
        element.css("transform", "rotate("+ this.angle+"rad");
        element.css("top",this.position.top);
        element.css("left",this.position.left);

    }
    
}

/*END class moving object*/

/* Class Asteroid */
class Asteroid extends MovingObject{
    constructor(position, ID, classType, speed,angle) {
    super(position, ID,classType,speed,angle)
    this.life = 100.;
  }
    
}
/* END Class Asteroid */

/*CLASS Asteroid Factory*/
class AsteroidFactory{
    
    constructor() {
        this.generator = 0;
    }
    
    createAsteroid(position,speed, angle){
        this.generator +=1;
        var bulletPosition =  {left: position.left, top: position.top};
        return new Asteroid(bulletPosition , 
                          "Asteroid_" + this.generator, "asteroid",speed, angle);
    }
}
/*END CLASS Asteroid Factory*/

/*CLASS SPACESHIP*/
class SpaceShip extends MovingObject{
  constructor(position, ID, speed) {
    super(position, ID, "spaceShip",speed, -Math.PI/2);
    this.life = 100.;
    this.bulletFactory = new BulletFactory();
    this.firedBullets = [];
    
  }
    
    update(dt){
        //update position
        super.update(dt);        
        //update bullets
        for (var i = 0 ; i < this.firedBullets.length;i++){
            this.firedBullets[i].update(dt);
        }
        
    }
    updateView(){
        
        super.updateView();
        //update view bullets
        for (var i = 0 ; i < this.firedBullets.length;i++){
            
            this.firedBullets[i].updateView();
        }
    }
    
    fire(){
        
        var vleft = parseFloat(this.position.left);
        alert("vleftr:" + vleft);
        var vtop = parseFloat(this.position.top);
        var L = 15;
        vleft += L*Math.sin(this.angle);
        vleft += "px";
        alert("vleftr after:" + vleft);
        vtop += L*Math.cos(this.angle);
        vtop +="px";
        var position = {
            left: vleft,
            top:vtop
            
        };
        this.firedBullets.push(this.bulletFactory.createBullet(position, this.angle));
        this.firedBullets[this.firedBullets.length - 1].updateView();
    }
    
    turnLeft(){
        this.angle -= Math.PI/8;
        this.inertiaAngle -= Math.PI/8;
        
    }
    
    turnRight(){
        this.angle += Math.PI/8;
        this.inertiaAngle += Math.PI/8;
    }
    
    moveTop(){
        var dt = 1.;
        var dx = this.speed*dt*Math.cos(this.angle)*1;
        var dy = this.speed*dt*Math.sin(this.angle)*1;    
        var left = parseFloat(this.position.left) + dx;
        var top = parseFloat(this.position.top) + dy;
        this.speed+=1;
        this.updateView();
    }
    
    moveDown(){
        var dt = 1.;
        var dx = this.speed*dt*Math.cos(this.inertiaAngle)*1;
        var dy = this.speed*dt*Math.sin(this.inertiaAngle)*1;    
        var left = parseFloat(this.position.left) - dx;
        var top = parseFloat(this.position.top) - dy;
        this.speed-=1;
        this.updateView();
    }
}
/*END-CLASS SPACESHIP*/


/*CLASS BULLET*/
class Bullet extends MovingObject{
    
    
    constructor(position, ID, classType, speed,angle) {
        super(position, ID,classType,speed,angle)
        this.life = 10.;
    }
    
    update(dt){

        var dx = this.speed*dt*Math.cos(this.angle);
        var dy = this.speed*dt*Math.sin(this.angle);
        
        
        var left = parseFloat(this.position.left) + dx;
        
        var top = parseFloat(this.position.top) + dy;
        
        this.position.left = left + "px";
        
        this.position.top = top + "px";
    }
    
    removeFromHtml(){
        
    }
}
/*END CLASS BULLET*/

/*CLASS BULLET Factory*/
class BulletFactory{
    
    constructor() {
        this.generator = 0;
    }
    
    createBullet(position, angle){
        this.generator +=1;
        var bulletPosition =  {left: position.left, top: position.top};
        return new Bullet(bulletPosition , 
                          "Bullet_" + this.generator,"bullet",5., angle);
    }
}
/*END CLASS BULLET Factory*/



/*
    The movement of the spaceship is encapsulated in internal functions.
    We keep ...ArrowPressed() methods in case we want to do other things.
*/

function leftArrowPressed() {
   mySpaceShip.turnLeft();

}

function rightArrowPressed() {
   mySpaceShip.turnRight();
}

function upArrowPressed() {
    mySpaceShip.moveTop();
}

function downArrowPressed() {
    mySpaceShip.moveDown();
}

function spaceKeyPressed(){
    
        mySpaceShip.fire();
}

function moveSelection(event) {
    switch (event.keyCode) {
        case 37:
            leftArrowPressed();
            break;

        case 39:
            rightArrowPressed();
            break;
        case 38:
            upArrowPressed();
            break;
        case 40:
            downArrowPressed();
            break;
        case 32:
            spaceKeyPressed();
             break;
        }
}
function gameInit(){
    // Globar variable spaceship
    
    var position = {top: "300px",
                    left: "300px"
                    }
    mySpaceShip = new SpaceShip(position,"spaceShip",1.);
    
    mySpaceShip.updateView();
    alert("INIT");
    //Create one asteroid
    myAsteroidFactory = new AsteroidFactory();
    alert("end asteroid factory creation");
    myAsteroids = [];
    var asteroidPosition =  {top: "250px", left :"250px"};
    myAsteroids.push(myAsteroidFactory.createAsteroid(asteroidPosition, 10+ 20.*Math.random(), 0.));
    alert("creating asteroid angle: "+myAsteroids[0].angle);
    myAsteroids[0].updateView();
    
}
function gameLoop()
{	
	if(!globalParameters.initiated){
		gameInit();
		globalParameters.initiated = true;
	}
 //   moveRandomCircle();
    mySpaceShip.update(1.);
    myAsteroids[0].update(1.);
    mySpaceShip.updateView();
    myAsteroids[0].updateView();
    displayParameters();
    setTimeout("gameLoop()",10);
 }

function displayParameters(){
	$('#parameters-life').html("LIFE: <b>" + mySpaceShip.life+"</b>");
}

function moveRandomCircle(){
    
    var listOfCircles = $('.circle');
    for (var i = 0; i < listOfCircles.length; i++) {
		var element = listOfCircles.eq(i);
		var dx = Math.random()-0.5;
		var left = parseFloat(element.css("left")) - dx*10;
		if (left < 0){
			left =  left + dx*20;
		}
		element.css('left',left);

		var dy = Math.random()-0.5;
		var top = parseFloat(element.css("top")) - dy*10;
		if (top < 0){
			top =  top + dy*20;
		}
		element.css('top',top);
	}

}
