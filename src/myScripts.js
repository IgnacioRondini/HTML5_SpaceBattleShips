

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
                }
            };

  function gameLoop()
        {
            moveRandomCircle();
            setTimeout("gameLoop()",10);
        }


    function moveRandomCircle(){
         var element = $('#circle');
         var dx = Math.random()-0.5;
         var left = parseFloat(element.css("left")) - dx*2;
         $('#circle').css('left',left);

        var dy = Math.random()-0.5;
        var top = parseFloat(element.css("top")) + dy*2;
       $('#circle').css('top',top);
    }