const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarIcone = document.querySelector('.app__card-primary-button-icon')
const tempoNaTela = document.querySelector('#timer')
const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;

const musica = new Audio('/Fokus/sons/luna-rise-part-one.mp3')
const audioBeep = new Audio('/Fokus/sons/beep.mp3')
const audioPlay = new Audio('/Fokus/sons/play.wav')
const audioPause = new Audio('/Fokus/sons/pause.mp3')

musica.loop = true

let tempoDecorridoEmSegundos = duracaoFoco;
let intervaloId = null;




musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => (
    tempoDecorridoEmSegundos = duracaoFoco,
    alterarContexto('foco'),
    focoBt.classList.add('active')
))

curtoBt.addEventListener('click', () => (
    tempoDecorridoEmSegundos = duracaoDescansoCurto,
    alterarContexto('descanso-curto'),
    curtoBt.classList.add('active')
))

longoBt.addEventListener('click', () => (
    tempoDecorridoEmSegundos = duracaoDescansoLongo,
    alterarContexto('descanso-longo'),
    longoBt.classList.add('active')
))

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/Fokus/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `                
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        alert('Tempo finalizado!')
        audioBeep.play()
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    iniciarOuPausarIcone.setAttribute('src', '/Fokus/imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Começar'
    iniciarOuPausarIcone.setAttribute('src', '/Fokus/imagens/play_arrow.png')
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-Br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()

