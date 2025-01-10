# Calendar
1. O Calendar é um projecto WEB que apresenta um calendário interativo.
Nele é apresentado um dia com evento assinalado em azul, os detalhes são exibidos com um clique no dia com evento, após o clique é realizada a exibição dos eventos deste dia com os detalhes dos mesmos num elemento ao lado.

# 2. Estrutura do Projeto
Criamos dois Web Components em um único ficheiro:
 - Calendário - Exibe o calendário e lida com eventos.
 - Outro elemento (div) - Exibe os detalhes dos dias ao lado do calendário com a opção de mudunça da posição deste mesmo elemento para baixo.

# Sobre os components:
1. Usou-se o Custom Elements para criar novos elementos HTML.
2. Usou-se o Shadow DOM para encapsular o estilo e a lógica do componente.
3. Usou-se o HTML Templates para definir a estrutura do componente.

O calendar-component renderiza o calendário
Quando um dia com eventos é clicado, um component é activado com os detalhes, especificamente *o dia da semana, o dia do mês e o respectivo mês*.

# Outros
A palavra-chave defer em um script HTML é usada para informar ao navegador que ele deve carregar e executar o script apenas depois que o documento HTML completo foi analisado (ou seja, depois que o DOM está pronto).

Isso é útil para evitar que o carregamento do script bloqueie a renderização do restante do HTML, especialmente se o script estiver incluído no *head* da página.
# Quando usar defer:
 - Ideal para scripts que interagem com o DOM ou dependem que a estrutura da página esteja carregada.
 - Especialmente útil para projetos onde o JavaScript é colocado no *head* do HTML.
