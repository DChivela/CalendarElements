class CalendarioInterativo extends HTMLElement {
    constructor() {
        super();

        // Shadow DOM
        const shadow = this.attachShadow({
            mode: 'open'
        });

        // HTML do componente
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* CSS do componente */
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f4f4f4;
    }

.container {
    display: flex;
    justify-content: center; /* Centraliza horizontalmente */
    align-items: center;    /* Centraliza verticalmente */
    height: 100vh;          /* Ocupa toda a altura da viewport */
    background-color: #f4f4f4;
    /* Mantém o gap entre os elementos */
    gap: 20px;
    flex-wrap: wrap; /* Permite que os elementos quebrem para a próxima linha */
}

.container.horizontal .detalhes {
    order: 1;
    width: auto; /* Lado direito */
}

.container.vertical .detalhes {
    order: 2;
    width: 100%;  /*Abaixo do calendário */
    /*width: 300px;  Ajuste o tamanho de acordo com o que você deseja */
    margin-top: 20px; /* Cria uma distância razoável do calendário */
    flex-direction: column; /* Para alternar para vertical */
    align-items: center; /* Centraliza os itens horizontalmente */
}
//     .container.vertical {
//     flex-direction: column; /* Para alternar para vertical */
//     align-items: center; /* Centraliza os itens horizontalmente */
// }

.calendario {
    text-align: center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.navegacao{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;   
}
.navegacao button{
    background: none;
    font-size: 18px;
    font-weight: 900;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 10px;
    border: none;
    transition: background-color 0.3s, color 0.3s; /*Para dar efeito quando passar o cursor nas setas*/
}
.navegacao button:hover{
    background-color: #333;
    color: #fff;
}

.dias-semana,
.dias {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    margin-top: 10px;
}

.dias div {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    cursor: pointer;
}
.marcado:hover{
    background-color: #007bff;
    color: #ccc;
    font-size: 24px;
}

.marcado {
    border: 2px solid #007bff;
    font-weight: bold;
    color: #007bff;
    border: 1px solid #333;
    border-radius: 4px;
    background-color: #007bff;
}

.detalhes {
    width: 300px; /* Define uma largura fixa para evitar que o elemento se expanda */
    margin-top: 10px; /* Espaçamento quando posicionado abaixo */
    text-align: left;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background-color: #fff;
}
    .detalhes {
    transition: width 0.3s ease, margin-top 0.3s ease; /* Adiciona uma transição suave */
}
//     .detalhes.aberto {
//     width: auto; /* Altere conforme necessário para adaptação */
// }


.detalhes ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.detalhes li {
    margin-bottom: 10px;
}
                    .detalhes.aberto {
                    width: auto;
                }

                .detalhes.below {
                    width: auto;
                }

                .match-width {
                    width: calc(100% - 40px); /* Ajusta a largura com base no calendário */
                    // max-width: 300px;
                }

                #toggle-position {
                    margin-top: 10px;
                    background-color: #007bff;
                    color: white;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                #toggle-position:hover {
                    background-color: #0056b3;
                }

            </style>
    <div class="container">
        <div class="calendario">
            <div class="navegacao">
                <button id="prev-mes">&#10096</button>
                    <h2 id="mes-ano"></h2>
                <button id="next-mes">&#10097</button>
            </div>
            <div class="dias-semana">
                <div>Dom</div>
                <div>Seg</div>
                <div>Ter</div>
                <div>Qua</div>
                <div>Qui</div>
                <div>Sex</div>
                <div>Sáb</div>
            </div>
            <div class="dias">
                <!-- Dias do mês -->
            </div>
        </div>
        <div class="detalhes">
        <button id="toggle-position">Alternar Posição</button>
            <h3>Dias Marcados</h3>
            <ul id="lista-detalhes">
                <!-- Detalhes dos dias marcados -->
            </ul>
        </div>
    </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));

        // Seletores do Shadow DOM
        this.diasContainer = shadow.querySelector('.dias');
        this.listaDetalhes = shadow.querySelector('#lista-detalhes');
        this.mesAnoElement = shadow.querySelector('#mes-ano');
        this.btnPrevMes = shadow.querySelector('#prev-mes');
        this.btnNextMes = shadow.querySelector('#next-mes');
        this.togglePositionBtn = shadow.querySelector('#toggle-position');
        this.calendarioContainer = shadow.querySelector('.container');
        this.detalhesDiv = shadow.querySelector('.detalhes');

        this.currentDate = new Date();
        this.diasMarcados = [{
                dia: 3,
                semana: 'Sexta-feira',
                mes: 0,
                ano: 2025
            },
            {
                dia: 19,
                semana: 'Domingo',
                mes: 0,
                ano: 2025
            },
            {
                dia: 31,
                semana: 'Sexta-feira',
                mes: 0,
                ano: 2025
            },
        ];
    }

    connectedCallback() {
        this.gerarCalendario(this.currentDate);
        this.btnPrevMes.addEventListener('click', this.prevMes.bind(this));
        this.btnNextMes.addEventListener('click', this.nextMes.bind(this));
        this.togglePositionBtn.addEventListener('click', this.alternarPosicaoDetalhes.bind(this));
    }

    disconnectedCallback() {
        this.btnPrevMes.removeEventListener('click', this.prevMes);
        this.btnNextMes.removeEventListener('click', this.nextMes);
        this.togglePositionBtn.removeEventListener('click', this.alternarPosicaoDetalhes);
    }

    limparDetalhes() {
        this.listaDetalhes.innerHTML = '';
    }

    adicionarDetalhes(dia, mes, ano) {
        this.limparDetalhes();
        this.diasMarcados.forEach(d => {
            const li = document.createElement('li');
            li.textContent = `${d.semana}, ${d.dia} de ${new Date(
                d.ano,
                d.mes
            ).toLocaleString('pt-BR', { month: 'long' })}`;
            this.listaDetalhes.appendChild(li);
        });
    }

    // Função para alternar a posição da div de detalhes
    alternarPosicaoDetalhes() {
        if (this.calendarioContainer.classList.contains('horizontal')) {
            this.calendarioContainer.classList.remove('horizontal');
            this.calendarioContainer.classList.add('vertical');
            this.detalhesDiv.classList.add('match-width');
        } else {
            this.calendarioContainer.classList.remove('vertical');
            this.calendarioContainer.classList.add('horizontal');
            this.detalhesDiv.classList.remove('match-width');
        }
    }

    gerarCalendario(data) {
        this.diasContainer.innerHTML = '';
        this.limparDetalhes();

        const ano = data.getFullYear();
        const mes = data.getMonth();

        const primeiroDiaMes = new Date(ano, mes, 1).getDay();
        const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();

        this.mesAnoElement.textContent = `${data.toLocaleString('pt-BR', {
            month: 'long',
        })} ${ano}`;

        // Preencher espaços vazios antes do primeiro dia
        for (let i = 0; i < primeiroDiaMes; i++) {
            const emptyDiv = document.createElement('div');
            this.diasContainer.appendChild(emptyDiv);
        }

        // Renderizar os dias do mês
        for (let dia = 1; dia <= ultimoDiaMes; dia++) {
            const diaElement = document.createElement('div');
            diaElement.textContent = dia;

            const marcado = this.diasMarcados.find(
                d => d.dia === dia && d.mes === mes && d.ano === ano
            );

            if (marcado) {
                diaElement.classList.add('marcado');
            }
            // Adicionar evento de clique para exibir detalhes
            diaElement.addEventListener('click', () =>
                this.adicionarDetalhes(dia, mes, ano)
            );
            this.diasContainer.appendChild(diaElement);
        }
    }

    prevMes() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.gerarCalendario(this.currentDate);
    }

    nextMes() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.gerarCalendario(this.currentDate);
    }
}

customElements.define('calendario-interativo', CalendarioInterativo);
