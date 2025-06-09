const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const imagem = document.createElement("div");
imagem.classList.add("imagem-fase");
caixaPrincipal.insertBefore(imagem, caixaPerguntas);

let score = 0;

const somAgua = new Audio("632140__escola_ort__regador1.wav");
const somFlores = new Audio("florescendo.mp3");
const somPraga = new Audio("praga.mp3");
const somFinalMagico = new Audio("videoplayback.mp4");

const perguntas = [
    {
        enunciado: "🌱 Você encontrou uma semente mágica! Onde deseja plantá-la?",
        imagem: "🌱",
        alternativas: [
            {
                texto: "Num vaso com terra fértil na varanda.",
                afirmacao: "A planta adorou a terra macia e o sol da manhã.",
                pontos: 2
            },
            {
                texto: "No meio do quintal, perto de outras plantas.",
                afirmacao: "A semente ganhou companhia, mas a sombra dificultou o crescimento.",
                pontos: 1
            }
        ]
    },
    {
        enunciado: "💧 A planta começou a germinar! Como você vai regá-la?",
        imagem: "🌿",
        som: somAgua,
        alternativas: [
            {
                texto: "Com um pouco de água todos os dias.",
                afirmacao: "A quantidade certa manteve a terra úmida e ajudou no crescimento saudável.",
                pontos: 2
            },
            {
                texto: "Com muita água de uma vez só.",
                afirmacao: "O excesso deixou a terra encharcada e as raízes quase afogaram!",
                pontos: 0
            }
        ]
    },
    {
        enunciado: "🌤️ O tempo está mudando. Como vai proteger sua planta?",
        imagem: "🌿",
        alternativas: [
            {
                texto: "Coloca perto da janela, com luz e sem vento.",
                afirmacao: "Ela ficou protegida e continua crescendo forte!",
                pontos: 2
            },
            {
                texto: "Deixa do lado de fora, para pegar bastante sol direto.",
                afirmacao: "O sol forte queimou algumas folhas, mas ela resistiu.",
                pontos: 1
            }
        ]
    },
    {
        enunciado: "🪲 Uma praga apareceu nas folhas! O que fazer?",
        imagem: "🌿",
        som: somPraga,
        alternativas: [
            {
                texto: "Usar um spray natural com alho e sabão.",
                afirmacao: "A praga sumiu e a planta ficou protegida naturalmente!",
                pontos: 2
            },
            {
                texto: "Ignorar, deve passar sozinha.",
                afirmacao: "A praga se espalhou e deixou a planta mais fraca.",
                pontos: 0
            }
        ]
    },
    {
        enunciado: "🌸 Sua planta começou a florescer! Como vai cuidar agora?",
        imagem: "🌸",
        som: somFlores,
        alternativas: [
            {
                texto: "Continua regando, conversando e cuidando com carinho.",
                afirmacao: "A planta floresceu linda e cheia de vida, como um jardim mágico!",
                pontos: 2
            },
            {
                texto: "Agora que cresceu, não precisa de tanto cuidado.",
                afirmacao: "Ela começou a murchar sem atenção e carinho contínuo.",
                pontos: 0
            }
        ]
    }
];

let atual = 0;
let historiaFinal = "";

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    const perguntaAtual = perguntas[atual];
    if (perguntaAtual.som) {
        perguntaAtual.som.play();
    }

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    imagem.textContent = perguntaAtual.imagem;
    caixaAlternativas.textContent = "";

    for (const alternativa of perguntaAtual.alternativas) {
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;
        botao.addEventListener("click", () => {
            historiaFinal += alternativa.afirmacao + " ";
            score += alternativa.pontos;
            atual++;
            mostraPergunta();
        });
        caixaAlternativas.appendChild(botao);
    }
}

function mostraResultado() {
    caixaPerguntas.textContent = "🌻 Resultado da Sua Planta 🌻";
    let emojiFinal = "";
    let resumo = "";

    if (score >= 8) {
        emojiFinal = "🌼✨";
        resumo = "Parabéns! Sua planta se tornou mágica e espalha alegria por onde passa!";
        somFinalMagico.play();
    } else if (score >= 5) {
        emojiFinal = "🌻";
        resumo = "Muito bem! Sua planta cresceu forte e cheia de flores!";
    } else {
        emojiFinal = "🥀";
        resumo = "Oh não! Sua planta ficou doente... mas sempre há tempo para tentar de novo.";
    }

    imagem.textContent = emojiFinal;
    textoResultado.textContent = historiaFinal + "\n\n" + resumo;
    caixaAlternativas.textContent = "";
}

mostraPergunta();
