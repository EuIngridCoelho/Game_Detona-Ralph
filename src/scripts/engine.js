const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLives: 3
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};


function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime


    if (state.values.currentTime < 0) {

        state.values.currentLives--;
        state.view.lives.textContent = state.values.currentLives;

        if (state.values.currentLives > 0) {
            state.values.currentTime = 60;
            state.view.timeLeft.textContent = state.values.currentTime;
            state.values.currentTime--;

            alert("O seu resultado foi " + state.values.result + "."+"\n"+"Clique em OK para continuar");

        } else {

            state.values.currentTime = 0;
            state.view.timeLeft.textContent = state.values.currentTime;
            clearInterval(state.actions.countDownTimerId);
            clearInterval(state.actions.timerId);

            function restart(){
                var resultado = confirm("GAME OVER!" + "\n" + "O seu resultado foi " + state.values.result + "\n" + "Clique em OK para RECOMEÇAR.");
                if (resultado == true) {
                    alert("Isso ai!" + "\n" + "Vamos lá!!");
                    playSound("win");
                    setTimeout(() => {
                        window.location.reload();   
                    }, 3000);
                }
                else{
                    alert("Você desistiu..." + "\n" + "\n" + "Até a próxima,então!");
                    playSound("game-over");
                }
            }

            restart();
        }
    }
}



function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.5;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id
}



function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition && (state.values.currentLives > 0)) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    })
}

function initialize() {
    addListenerHitBox();
};

initialize();
