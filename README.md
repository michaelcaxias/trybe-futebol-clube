# 🚧 Documentação em progresso..

![front-example](front-example.png)

<img src="./app/frontend/src/images/negative_logo.png" alt="exemplo imagem" width="100px" align="right">

# Trybe Futebol Clube

Aplicação Fullstack de um gerenciador de partidas de futebol utilizando conceitos de programação orientada a objetos com testes de integração + TDD.

> Somente o Back-end deste projeto foi desenvolvido por mim, o front-end já estava pronto.

## ⭐ Habilidades
- Dockerizar uma aplicação
- Criar uma API utilizando o Sequelize e NodeJs e Typescript.
- Validar e criptografar tokens de autenticação com o [JWT](https://jwt.io/).
- Realizar validações de campos com o [Joi](https://joi.dev/api/).


## 💻 Como iniciar

> Antes de iniciar, é importante ressaltar que é necessário ter o Docker instalado.

1. Faça o clone do projeto
3. Instale as dependências
```shell
npm install
```
4. Inicie a aplicação subindo o container Docker
```shell
npm run compose:up
```
5. Agora basta ir ao seu navegador e acessar a URL
```shell
# Front-end:
http://localhost:3000/
# Back-end:
http://localhost:3001/
```

# 💡 Documentação da API

## Lista todos os Clubes

```http
  GET /clubs
```

| Corpo da requisição   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| Vazio | `json` |  |


**Retorno em caso de sucesso**

```json
[
	{
		"id": 1,
		"clubName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"clubName": "Bahia"
	},
	{
		"id": 3,
		"clubName": "Botafogo"
	},
	...
]
```

## Feito Com:
[![IDE](https://img.shields.io/badge/Visual_studio_code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)](https://code.visualstudio.com/)
[![NODEJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en/)
[![TYPESCRIPT](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SEQUELIZE](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)](https://sequelize.org/master/)
[![MYSQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![DOCKER](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![MOCHA](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white)](https://www.docker.com/)
[![CHAI](https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white)](https://www.chaijs.com/)
[![REACT](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAF)](https://pt-br.reactjs.org/)


### Contato

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/michaelcaxias/)

<p align="center">Copyright © 2021 Michael Caxias</p>
