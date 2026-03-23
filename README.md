# Funil de Tráfego Pago — Editor Visual

Editor visual de funis de campanha construído com **React Flow** e **shadcn/ui**. Permite criar etapas, conectá-las e visualizar métricas simuladas, tudo persistido no navegador.

## Projeto no Vercel

https://atividade-react-flow-twr.vercel.app/

## Como rodar

```bash
npm install
npm run dev
```

## Funcionalidades

- Criar etapas do funil (Anúncio, Landing Page, Formulário, Checkout, Página de Obrigado)
- Conectar etapas arrastando entre os handles dos nós
- Editar nome, tipo e métricas de cada etapa pelo painel lateral
- Remover etapas e conexões com confirmação
- Restaurar o funil inicial a qualquer momento
- Dados simulados de impressões, cliques, leads, conversões e receita
- Persistência automática via `localStorage`
- Validação de conexões com prevenção de ciclos

## Stack

| Tecnologia | Uso |
|---|---|
| React 19 + TypeScript | Base da aplicação |
| React Flow (`@xyflow/react`) | Canvas interativo do funil |
| shadcn/ui + CVA | Componentes (Button, Card, Badge) |
| Tailwind CSS 4 | Estilização |
| Vite | Build e dev server |

## Estrutura

```
src/
├── app/                  # Componente principal
├── components/ui/        # Primitivos (Button, Card, Badge)
├── features/funnel/
│   ├── components/       # Canvas, Inspector, Toolbar, StageNode
│   ├── data/             # Catálogo de etapas e estado inicial
│   ├── hooks/            # Hook do editor (useFunnelEditor)
│   └── lib/              # Storage e validação de conexões
└── styles/               # CSS global + design system
```

## Design da interface
Usarei o tema [Velvet Night](https://coolors.co/palette/e2cfea-a06cd5-6247aa-102b3f-062726), com as seguintes diretrizes iniciais:

- `#E2CFEA`
- `#A06CD5`
- `#6247AA`
- `#102B3F`
- `#062726`