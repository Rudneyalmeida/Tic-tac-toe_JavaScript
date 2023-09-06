// variaveis globais
const boardRegions = document.querySelectorAll('#gameBoard span');
let vBoard = [];
let turnPlayer = '';

function updateTitle() {
  const playerInput = document.getElementById(turnPlayer)
  document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame() {   //inicializa o jogo
  vBoard = [['', '', ''], ['', '', ''], ['', '', '']];
  turnPlayer = 'player1'; //define o player 1 como o primeiro a jogar
  document.querySelector('h2').innerHTML = 'Sua vez <span id="turnPlayer"></span>'
  updateTitle(); //atualiza o titulo
  boardRegions.forEach(function (element) {
    element.classList.remove('win'); //remove a classe win
    element.innerText = ''; //limpa o tabuleiro
    element.classList.add('cursor-pointer'); //muda o cursor
    element.addEventListener('click', handleBoardClick); //adiciona o evento de click no tabuleiro
  });

}
function getWinRegions() {
  const winRegions = [];
  if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2]) //verifica se há regiões vencedoras
    winRegions.push('0.0', '0.1', '0.2');   //adiciona as regiões vencedoras
  if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
    winRegions.push('1.0', '1.1', '1.2');
  if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
    winRegions.push('2.0', '2.1', '2.2');
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
    winRegions.push('0.0', '1.0', '2.0');
  if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
    winRegions.push('0.1', '1.1', '2.1');
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
    winRegions.push('0.2', '1.2', '2.2');
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    winRegions.push('0.0', '1.1', '2.2');
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
    winRegions.push('0.2', '1.1', '2.0');
  return winRegions;  //retorna as regiões vencedoras
}

function disableRegion(element) { //desabilita a região
  element.classList.remove('cursor-pointer') //muda o cursor
  element.removeEventListener('click', handleBoardClick); //remove o evento de click no tabuleiro
}

function handleWin(winRegions) { //função que lida com a vitória
  winRegions.forEach(function (region) {
    const element = document.querySelector('[data-region="' + region +'"]').classList.add('win'); // <span data-region="0.0"></span>
  });
  const playerName = document.getElementById(turnPlayer).value;
  document.querySelector('h2').innerHTML = playerName + ' venceu! &#127881'; //mostra o vencedor
};

function handleBoardClick(event) { //função que lida com o click no tabuleiro
  const span = event.currentTarget; // <span data-region="0.0"></span>
  const region = span.dataset.region; // '0.0'
  const rowColumnPair =  region.split('.'); // ['0', '0']
  const row = rowColumnPair[0]; // '0'
  const column = rowColumnPair[1];
  if (turnPlayer === 'player1') { //verifica se é a vez do player 1
    span.innerText = 'X'; //coloca o X no tabuleiro
    vBoard[row][column] = 'X';  //coloca o X na matriz
  } else {
    span.innerText = 'O'; //coloca o O no tabuleiro
    vBoard[row][column] = 'O'; //coloca o O na matriz
  }
  console.clear();
  console.table(vBoard);

  disableRegion(span); //desabilita a região
  const winRegions = getWinRegions(); //verifica se há regiões vencedoras
  if (winRegions. length > 0) {
      handleWin(winRegions); //chama a função que lida com a vitória
  }else if (vBoard.flat().includes('')) { //verifica se há espaços vazios
      turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'; //troca o player
      updateTitle(); //atualiza o titulo
  }else {
      document.querySelector('h2').innerHTML = 'Empate!'
  }

}

 document.getElementById('start').addEventListener('click', initializeGame);   //inicializa o jogo
