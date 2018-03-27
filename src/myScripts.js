
var spaceShipParams = {
	life:100.0
};
globalParameters = {
	initiated:false
};

function leftArrowPressed() {
    var element = $('#spaceShip');
    var left = parseInt(element.css("left")) - 5;
    $('#spaceShip').css('left',left);

                }

function rightArrowPressed() {
    var element = $('#spaceShip'); 
    var left = parseInt(element.css("left")) + 5;
    $('#spaceShip').css('left',left);
}

function upArrowPressed() {
    var element = $('#spaceShip');
    var top = parseInt(element.css("top")) - 5;
    $('#spaceShip').css('top',top);
}

function downArrowPressed() {
    var element = $('#spaceShip');
    var top = parseInt(element.css("top")) + 5;
    $('#spaceShip').css('top',top);
}

function spaceKeyPressed(){
    var container = $('#container');
    // add bullet
    container.append('<div class = "bullet"></div>');
    var newBullet = $('.bullet').eq(-1);
    var spaceShip = $('#spaceShip');
	newBullet.css("top",spaceShip.css("top"));
	newBullet.css("left",spaceShip.css("left"));
	newBullet.css("right",spaceShip.css("right"));
	
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
	listOfCircles = $(".circle");
	for (i = 0; i < listOfCircles.length; i++) {
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
    moveBullets();
    displayParameters();
    setTimeout("gameLoop()",10);
 }

function displayParameters(){
	$('#parameters-life').html("LIFE: <b>" + spaceShipParams.life+"</b>");
}

function moveRandomCircle(){
    
    var listOfCircles = $('.circle');
    for (i = 0; i < listOfCircles.length; i++) {
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

function moveBullets(){
	
	var listOfBullets = $('.bullet');
	for (i = 0; i < listOfBullets.length; i++) {
		var element = listOfBullets.eq(i);
		var top = parseInt(element.css("top")) - 5;
		element.css('top',top);
		
	}
}
