const simbolosRolos = ['🍒', '🍋', '🍊', '🍉', '🍇', '⭐', '🔔'];
const premios = {
    '🍒': 0.5,
    '🍋': 1.0,
    '🍊': 2.0,
    '🍉': 5.0,
    '🍇': 10.0,
    '⭐': 2.5,
    '🔔': 7.5
};
let saldo = 10.0;

function obterSimboloAleatorio() {
    return simbolosRolos[Math.floor(Math.random() * simbolosRolos.length)];
}

function atualizarSaldo(valor) {
    saldo += valor;
    document.getElementById('saldo').textContent = `Saldo: R$ ${saldo.toFixed(2)}`;
}

document.getElementById('botao-girar').addEventListener('click', () => {
    if (saldo < 0.5) {
        document.getElementById('resultado').textContent = 'Saldo insuficiente para jogar.';
        return;
    }

    atualizarSaldo(-0.5);

    for (let i = 1; i <= 9; i++) {
        document.getElementById(`reel${i}`).textContent = obterSimboloAleatorio();
    }

    const rolos = [];
    for (let i = 1; i <= 9; i++) {
        rolos.push(document.getElementById(`reel${i}`).textContent);
    }

    const linhasVencedoras = [
        [0, 1, 2], // Linha 1
        [3, 4, 5], // Linha 2
        [6, 7, 8]  // Linha 3
    ];

    let ganhou = false;
    let valorPremio = 0;

    for (const linha of linhasVencedoras) {
        if (rolos[linha[0]] === rolos[linha[1]] && rolos[linha[1]] === rolos[linha[2]]) {
            ganhou = true;
            valorPremio = premios[rolos[linha[0]]] * 2; // Multiplicador de 2 para o valor do prêmio
            break;
        }
    }

    if (ganhou) {
        atualizarSaldo(valorPremio);
        document.getElementById('resultado').textContent = `Você ganhou! Prêmio: R$ ${valorPremio.toFixed(2)}`;
    } else {
        document.getElementById('resultado').textContent = 'Tente novamente!';
    }
});
