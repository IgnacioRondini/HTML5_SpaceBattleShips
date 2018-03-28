//"use strict";



globalParameters = {
	initiated: false
};

/*CLASS SPACESHIP*/
class SpaceShip {
  constructor(position) {
    this.position = position;
    this.life = 100.;
    this.class = "spaceShip";
    this.bulletFactory = new BulletFactory();
    this.firedBullets = [];
    this.speed = 1;
    this.angle = Math.PI/2;
    this.inertiaAngle = Math.PI/2;
  }
    
    update(dt){
        
        var dx = this.speed*dt*Math.cos(this.inertiaAngle)*.1;
        var dy = this.speed*dt*Math.sin(this.inertiaAngle)*.1;    
        var left = parseFloat(this.position.left) + dx;
        var top = parseFloat(this.position.top) + dy;
        this.position.left = left + "px";
        this.position.top = top + "px";
        
        //update bullets
        for (var i = 0 ; i < this.firedBullets.length;i++){
            this.firedBullets[i].update(dt);
        }
        
    }
    updateView(){
        
        //get the corresponding object
        var element = $('.' + this.class);
        element.css("top", this.position.top);
        element.css("left", this.position.left);
        element.css("transform", "rotate("+ this.angle+"rad");
        //update view bullets
        for (var i = 0 ; i < this.firedBullets.length;i++){
            
            this.firedBullets[i].updateView();
        }
    }
    
    fire(){
        
        this.firedBullets.push(this.bulletFactory.createBullet(this.position, this.angle));
        this.firedBullets[this.firedBullets.length - 1].updateView();
    }
    
    turnLeft(){
        this.angle += Math.PI/8;
        this.inertiaAngle += Math.PI/8;
        
    }
    
    turnRight(){
        this.angle -= Math.PI/8;
        this.inertiaAngle -= Math.PI/8;
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
class Bullet{
    constructor(position, ID, angle) {
    this.position = position;
    this.class = "Bullet";
    this.ID = ID;
    this.speed = 1.;
    this.angle = angle;
  }
    
    update(dt){
        
        var dx = this.speed*dt*Math.cos(this.angle);
        var dy = this.speed*dt*Math.sin(this.angle);
        
        
        var left = parseFloat(this.position.left) + dx;
        
        var top = parseFloat(this.position.top) + dy;
        
        this.position.left = left + "px";
        
        this.position.top = top + "px";
    }
    
    updateView(){
        var container = $('#container');
        var element = $('#'+this.ID);
        
        //Check if already on container
        if(element.length ==0){
        // add bullet
            container.append('<div id='+this.ID+ ' class = "bullet"></div>');    
            element = $("#" + this.ID);
        }
        
        element.css("top",this.position.top);
        element.css("left",this.position.left);

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
        alert("create bullet angle:" + angle);
        this.generator +=1;
        var bulletPosition =  {left: position.left, top: position.top};
        return new Bullet(bulletPosition , 
                          "Bullet_" + this.generator, angle);
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
    mySpaceShip = new SpaceShip(position);
    mySpaceShip.updateView();
	var listOfCircles = $(".circle");
	for (var i = 0; i < listOfCircles.length; i++) {
		var left = i*100;
		var top = i*100;
		listOfCircles.eq(i).css('left',left);
		listOfCircles.eq(i).css('top',top);
		
	}
}
function gameLoop()
{	
	if(!globalParameters.initiated){
		gameInit();
		globalParameters.initiated = true;
	}
    moveRandomCircle();
    mySpaceShip.update(1.);
    mySpaceShip.updateView();
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
