$(document).ready(function() {
    // Winning combinations
    const wins = [[1,2,3], [1,4,7], [1,5,9], [2,5,8], [3,5,7], [3,6,9], [4,5,6], [7,8,9]];  
    let winner;

    /* Check if square is free */
    function checkIfFree(pos) {
        return $(`td[data-tile=${pos}]`).hasClass('played') ? false : true;
    }

    /* Clear board after play */
    function clearBoard() {
        $('td').empty();
        $('td').removeClass('played');
        $('td').data('player', '');
    }
    /* *******************
		HUMAN PLAY (X)
	******************* */

    /* Human player play function */
    function humanPlay(square) {
        square.addClass('played');
        square.data('player', 'X');
        square[0].innerHTML = 'X';
    }

    // Check if the game is a tie 
    function draw() {
        if ($('td.played').length === 9) {
            alert('Its a tie');
            setTimeout(clearBoard, 1000);
        }
    }

    /* Check for win */
    function registerWin(x, y, z) {
        if (
            $(`td[data-tile=${x}]`).hasClass('played') === true &&
            $(`td[data-tile=${y}]`).hasClass('played') === true &&
            $(`td[data-tile=${z}]`).hasClass('played') === true

            &&
            
            $(`td[data-tile=${x}]`).data('player') === $(`td[data-tile=${y}]`).data('player') &&
            $(`td[data-tile=${x}]`).data('player') === $(`td[data-tile=${z}]`).data('player')

        ) {
            winner = $(`td[data-tile=${x}]`).data('player');
            return true;
        } else {
            return false;
        }
    }

    function checkWinner() {
        for (let i=0; i<wins.length; i++) {
            let w = registerWin(wins[i][0], wins[i][1], wins[i][2]);

            // If a winner is gotten
            if (w) {
                alert(`${winner} wins`);
                setTimeout(clearBoard, 1000);
                break;
            } 

            // If no winner is gotten, therefore draw
            if (!w && i === (wins.length-1)) {
                draw();
            } 
        }
    }

     /* *******************
	    COMPUTER PLAY (X)
	*********************** */

    function computerStrategy(x,y,z) {
        if (
            $(`td[data-tile=${x}]`).hasClass('played') === true &&
            $(`td[data-tile=${y}]`).hasClass('played') === true &&
            $(`td[data-tile=${z}]`).hasClass('played') === false &&
            $(`td[data-tile=${x}]`).data('player') === $(`td[data-tile=${y}]`).data('player')
            
        ) {
            return z;
        } else if (
            $(`td[data-tile=${x}]`).hasClass('played') === true &&
            $(`td[data-tile=${z}]`).hasClass('played') === true &&
            $(`td[data-tile=${y}]`).hasClass('played') === false &&
            $(`td[data-tile=${x}]`).data('player') === $(`td[data-tile=${z}]`).data('player')
        ) {
            return y;
        } else if (
            $(`td[data-tile=${y}]`).hasClass('played') === true &&
            $(`td[data-tile=${z}]`).hasClass('played') === true &&
            $(`td[data-tile=${x}]`).hasClass('played') === false &&
            $(`td[data-tile=${y}]`).data('player') === $(`td[data-tile=${z}]`).data('player')
        ) {
            return x;
        } else {
            return false;
        }
    }


    function computerPlay() {
        for (let i=0; i<wins.length; i++) {
            let tacticalPlay = computerStrategy(wins[i][0], wins[i][1], wins[i][2]);
            // console.log('tactics', tacticalPlay);
            if (tacticalPlay) {
                if (checkIfFree(tacticalPlay)) {
                    registerComputerMove(tacticalPlay);
                    checkWinner();
                    break;
                } else {
                    computerRandomPlay();
                    // break;
                }
            } 

            if(!tacticalPlay && i === (wins.length-1)) {
                computerRandomPlay();
            } 
        }
    }   

    function computerRandomPlay() {
        for (let i=0; i<100; i++) {
            let num = Math.floor((Math.random() * 9) + 1);
            // console.log('random', num);
            // console.log('free?', checkIfFree(num));
            if (checkIfFree(num)) {
                registerComputerMove(num);
                checkWinner();
                break;
            }  
        }
    }

    function registerComputerMove(pos) {
        $(`td[data-tile=${pos}]`)[0].innerHTML = 'O';
        $(`td[data-tile=${pos}]`).addClass('played');
        $(`td[data-tile=${pos}]`).data('player', 'O');
    }

     /* *******************
	    CLICK TO START GAME
	*********************** */
    $('td').on('click', function(){
        if (checkIfFree($(this).data('tile'))) {
            humanPlay($(this));
            checkWinner();
            setTimeout(computerPlay, 500);
        } else {
            alert('Sorry dude, that square is already taken');
        }

    });
});