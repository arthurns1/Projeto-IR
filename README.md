# Sistema de Controle de Dispositivos Via IOT 

Projeto desenvolvido para controlar via web, uma placa esp8266 de modelo genérico para enviar comandos para dispositivos via IOT com o intuito de reduzir gastos ligados a tais dispositivos

## Tecnologias Utilizadas

### Backend

- Express.js: Framework web para Node.js que facilita a criação de APIs.
- Javascript: Linguagem de programação usada para desenvolver a aplicação.
- Node.js: motor usado para rodar a aplicação web do lado do servidor.
- Handlebars: Motor de templates usado para facilitar o desenvolvimento das páginas.
- MongoDB: Banco de dados NoSQL para armazenamento de dados.
- Mongoose: Biblioteca JavaScript que simplifica a interação com o MongoDB.

### Frontend

- Handlebars: Motor de templates usado para facilitar o desenvolvimento das páginas.
- Bootstrap: Framework ultilizado para facilitar a decoração das páginas 

## Funcionalidades

- Adição, edição e exclusão de dispositivos e salas.
- Envio de comando para dispositivos esp.
- Gerenciamento de dispositivos em salas.

## Pré-Requisitos

- Node.js: [Instalação](https://nodejs.org/)
- npm (Node Package Manager): Normalmente é instalado junto com o Node.js
- Banco de dados: MongoDB (com Mongoose)

## Instalação

1. Clone o repositório: `git clone <Link deste Repositório>`
2. Navegue até a pasta do projeto: `cd seu-projeto`
3. Instale as dependências do backend: `npm install`

## Configuração

1. Configure as variáveis de ambiente no arquivo `.env`:

   - `PORT`: Porta em que o servidor Express irá rodar.
   - `DBPassword`: nome de usuário do banco de dados MongoDB.
   - `DBUser`: senha para conexão com o banco

   Exemplo de arquivo `.env`:
   PORT = 8081 
   DBpassword = "Senha"
   DBuser = "FulanoDeTal"

## Autores

- José Arthur Nascimento Santos (Desenvolvimento da aplicação web)
- Natan Souza (Desenvolvimento da aplicação no hardware)

## Licença

Este projeto está sob a licença [MIT License](LICENSE).
