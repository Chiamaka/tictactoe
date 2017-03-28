var tictactoe = {
    init() {
        this.domVariables();
        this.bindEvents();
    },
    domVariables() {
        this.boxes = document.getElementsByTagName('td');
    },
    bindEvents() {
        for (let i=0; i < tictactoe.boxes.length; i++) {
            tictactoe.boxes[i].onclick = tictactoe.showMessage;
            // console.log(tictactoe.boxes);
        }
    },
    showMessage() {
        console.log('clicked');
    }
};

tictactoe.init();