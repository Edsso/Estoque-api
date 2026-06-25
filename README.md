# API de Controle de Estoque (WMS)

Projeto backend desenvolvido para gerenciamento de estoque, simulando funcionalidades básicas de um sistema WMS.

## Funcionalidades

- Cadastro de produtos
- Entrada de estoque
- Saída de estoque
- Controle de quantidade
- Registro de movimentações

## Tecnologias

- Node.js
- Express
- SQLite

## Regras de Negócio

- Não permite saída com estoque insuficiente
- Todas movimentações são registradas

## Como rodar

```bash
npm install
node src/server.js