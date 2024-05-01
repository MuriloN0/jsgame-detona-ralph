//Essas variaveis que coloquei são views, ela irão alterar o elemento visual.
//Toda vez que acessamos ela vemos que ela fica com  uma caixa azul.

const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector("#live"),
    },
    values:{
        timerId: null,
        liveResult: 3,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    actions:{
        countDownTimerID: setInterval(countDown, 1000),
        // não muda nada deixar esse setInterval no actions, só está organizando tudo.
        // lembrando que da pra usar o mesmo metodo no timerID e retirar a function moveEnemy;
        // Actions sempre serão chamadas para alguma ação;
    },
};


// função para tocar o audio de fundo;
// vamos fazer uma interpolação de string para deixar mais dinâmico se tivessemos com mais audios;
function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}



// Função para contagem regressiva do timer;
function countDown(){
    state.values.curretTime --;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0){
        // clear serve para resetar sempre que o tempo acabar;
        clearInterval(state.actions.countDownTimerID);
        clearInterval(state.values.timerId);
        alert("GamerOver! O seu resultado foi: " + state.values.result);
    }
}

// função para mostrar aleatóriamente o enemy;
function randomSquare(){
    state.view.squares.forEach((square)=> {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id;
}


//intervalo para movimentar enemy;
function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

// função para contagem do score
function addListinerHitBox(){
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", () => {
            if ( square.id === state.values.hitPosition && state.values.liveResult > 0 && state.values.curretTime > 0) {
                state.values.result ++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit"); // aqui colocamos o nome apenas do audio sem o formato;
            } else if (state.values.liveResult > 0) {
                state.values.liveResult --;
                state.view.live.textContent = state.values.liveResult;
                state.values.hitPosition = null;
            }
        });
    });
}




//Vamos dexar uma funcao inicial que vai chamar as outras funções uando iniciar o nosso jogo.
function initialize() {
    moveEnemy();
    addListinerHitBox();
}

initialize();
