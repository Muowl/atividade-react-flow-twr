# Atividade Funil React Flow TWR

## Objetivo
Desenvolver um funil de campanhas de tráfego pago usando React Flow para representar o fluxo, shadcn/ui para os componentes da interface.

## Como rodar

```bash
npm install
npm run dev
```

## Requisitos Funcionais

A aplicação deve permitir que o usuário:

- criar etapas do funil visualmente;
- conectar etapas entre si para representar o fluxo da campanha;
- visualizar o encadeamento completo das etapas;
- editar informações de uma etapa existente;
- remover etapas do funil;
- visualizar dados simulados em cada etapa, como acessos, leads ou conversões;
- persistir o estado do funil no navegador, sem necessidade de backend.

### Etapas previstas no funil
Exemplos de etapas que poderão ser utilizadas na montagem do fluxo:

- Anúncio
- Landing Page
- Formulário
- Checkout
- Página de Obrigado

### Comportamentos esperados
- O usuário deve conseguir adicionar múltiplas etapas.
- Cada etapa deve possuir identificação visual clara.
- As conexões entre etapas devem ser exibidas de forma compreensível.
- A interface deve facilitar a leitura do caminho percorrido pelo usuário dentro do funil.
- A edição e remoção de etapas devem ser simples e acessíveis.

## Design da interface
Usarei o tema [Velvet Night](https://coolors.co/palette/e2cfea-a06cd5-6247aa-102b3f-062726), com as seguintes diretrizes iniciais:

- `#E2CFEA`: fundo suave, áreas secundárias e destaques leves;
- `#A06CD5`: ações secundárias, estados ativos leves e elementos de apoio;
- `#6247AA`: cor principal da identidade visual, usada em botões, nós ativos e destaques;
- `#102B3F`: base para textos escuros, cabeçalhos e áreas estruturais;
- `#062726`: apoio para contrastes fortes, detalhes e elementos de profundidade.
