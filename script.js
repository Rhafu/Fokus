//VARIÁVEIS INICIAIS
const html               = document.querySelector('html');
const focoBtn            = document.querySelector('.app__card-button--foco');
const descansoCurtoBtn   = document.querySelector('.app__card-button--curto');
const descansoLongoBtn   = document.querySelector('.app__card-button--longo');
const banner             = document.querySelector('.app__image');
const titulo             = document.querySelector('.app__title');
const inputMusicaFoco    = document.getElementById('alternar-musica');
const btnTemporizador    = document.getElementById('start-pause');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const iniciarOuPausarImg = document.querySelector('#start-pause img');
const temporizadorTela   = document.getElementById('timer');

const musica             = new Audio('./sons/luna-rise-part-one.mp3');
const pauseAudio         = new Audio('./sons/pause.mp3');
const playAudio          = new Audio('./sons/play.wav');
const beepAudio          = new Audio('./sons/beep.mp3');
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId              = null;

const buttonsPomodoro  = [
  focoBtn,
  descansoCurtoBtn,
  descansoLongoBtn
];

const titulosPagina = {
  'foco':'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>',
  'descanso-curto':'Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta.</strong>',
  'descanso-longo':'Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>'
};

const tempos = {
  'foco': 1500,
  'descanso-curto': 300,
  'descanso-longo': 900
}

buttonsPomodoro.forEach( (button) => {
  const contexto = button.getAttribute('data-contexto');

  alterarContexto(button, contexto);
});

inputMusicaFoco.addEventListener('change', () => {
  console.log(musica.paused);
  if(musica.paused) {
    musica.play();
  }else{
    musica.pause();
  }
})

function alterarContexto(button, contexto){
  button.addEventListener('click', () => {
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    titulo.innerHTML = titulosPagina[contexto];
    tempoDecorridoEmSegundos = tempos[contexto];
    activeInactive(contexto);
    mostrarTempo();
  });
}

function activeInactive(contexto){
  switch(contexto){
    case 'foco':
      focoBtn.classList.add('active');
      descansoCurtoBtn.classList.remove('active');
      descansoLongoBtn.classList.remove('active');
      break;
    case 'descanso-curto':
      descansoCurtoBtn.classList.add('active');
      focoBtn.classList.remove('active');
      descansoLongoBtn.classList.remove('active');
      break;
    case 'descanso-longo':
      descansoLongoBtn.classList.add('active');
      descansoCurtoBtn.classList.remove('active');
      focoBtn.classList.remove('active'); 
      break
  }
}

const iniciarOuPausarImgs = {
  'play': 'play_arrow.png',
  'pause': 'pause.png' 
};

const contagemRegressiva = () => {
  if(tempoDecorridoEmSegundos <= 0) {
    beepAudio.play();
    alert('Tempo Finalizado!');
    iniciarOuPausarBtn.textContent = "Começar";
    iniciarOuPausarImg.setAttribute('src', `./imagens/${iniciarOuPausarImgs['pause']}`)
    zerar();
    return
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
}

btnTemporizador.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
  if(intervaloId){
    pauseAudio.play();
    iniciarOuPausarBtn.textContent = "Começar";
    iniciarOuPausarImg.setAttribute('src', `./imagens/${iniciarOuPausarImgs['play']}`)
    zerar();
    return
  }
  playAudio.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBtn.textContent = "Pausar";
  iniciarOuPausarImg.setAttribute('src', `./imagens/${iniciarOuPausarImgs['pause']}`)
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
}

function mostrarTempo(){
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second:'2-digit'});
  temporizadorTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();