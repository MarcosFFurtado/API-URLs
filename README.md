# Boas-vindas ao repositório do projeto URL API!

O projeto consiste em um app composto de Backend e Frontend para deploy através do Rails.

O aplicativo criado é um pequeno sistema para gerenciamento de links pessoais.

O BackEnd é composto de dois objetos principais, a seção para gerenciar as URLs e posteriormente foi aplicado a seção de usuários, que através de login individualiza os links no BD para cada usuário, o que permite o uso da API por diversos usuários.

As validações de campos das requisições serão posteriormente implementadas.
<br><br>

# BackEnd

<details>
  <summary>
    <strong>Banco de Dados</strong>
  </summary>
<br>
  O banco de dados utilizado é o MongoDB através do Modelador de Objetos Mongoose para node.js.
  <br><br><br>

</details>

<details>
  <summary>
    <strong>Tecnologias Aplicadas</strong>
  </summary><br>

  **MongoDB**<br>
  **POO**<br>
  **Typescript**<br>
  **JavaScript**<br>
  **Docker**<br>
  **Node.js**<br><br>
  

</details>

<details>
  <summary>
    <strong>Como testar as requisições:</strong>
  </summary><br>

  - O BackEnd pode ser testado separadamente:

    1- Executar o comando 'npm install' na raiz do Backend para instalar as dependências;<br>
    2- Subir a partir da pasta de backend os containers com o comando:  docker-compose up;<br>
    Serão criados 2 containers, um do banco e dados e outro do node.<br>
    3- Acessar o container do node com o comando: docker exec -it URL_API  bash;<br>
    4- Executar no container o comando npm run dev;<br>
<br><br>
    A partir dai requisições podem ser feitas a partir de um cliente como o Thunder Client por exemplo seguindo as instruçoes abaixo: <br><br>


  - As requisições referentes as URLs devem ser realizadas na rota /url e seguir os seguintes padrões (o token do usuário é exigido):
     
    1- Retornar todos as URLs: GET, sem body;<br>
    2- Retornar URL especifica: GET, com campo "url" no body;<br>
    3- Cadastrar nova url: POST, com campos "description" e "url" no body (requeridos);<br>
    4- Editar uma entrada: PATCH, campo "id" requerido, "description" e "url" podem ser passados os dois ou apenas um deles;<br>
    5- Deletar uma entrada: DELETE,  campo "id" requerido;<br><br>

    A seção de URLs impede a duplicação de links idênticos (URLs) no banco para um mesmo usúario. Cada link np banco recebe uma chave secundária com o Id do usário logado através de um token valido, o qual é obtido através da rota login. Só é possivel realizar as querys no banco (rota /url) com um token de usuário válido.

    <br><br>


  - As requisições referentes aos Usuários devem ser realizadas na rota /create e /login e seguir os seguintes padrões:

    1- Cadastrar novo usuário: rota /user, com os campos "email" e "password" no body;<br>
    2- Logar usuário existente: rota /login, com os campos "email" e "password" no body;<br>

    Ao logar a API retorna um token, para as requisições da seção de URLs o token é exigido e a partir dele a API extrai o id do usuário para cadastro das URLs.


</details>

<br>

# FrontEnd

<details>
  <summary>
    <strong>Front End</strong>
  </summary>
<br>
  O Front End consiste de um interface simples para testar o Banco de Dados.
  <br><br><br>

</details>

<details>
  <summary>
    <strong>Tecnologias Aplicadas</strong>
  </summary><br>

  **React**<br>
  **React Router**<br>
  **React Hooks**<br>
  **JavaScript**<br>
  **HTML**<br>
  

</details>

<details>
  <summary>
    <strong>Utilizando a interface</strong>
  </summary><br>

  - Página de login:

    1- Não há restrições para os campos de login e senha<br>
    2- A pagina inicial permite cadastrar tb um novo usuário e em seguida logar<br>
<br><br>


  - APágina de URLs:
     
    1- Só existe restrição no campo de entrada do endereço da URL que exige um formato válido;<br>
    2- Assim que se vai adicionando linkes no usuário logado a tabela de links vai sendo populada abaixo<br>
    3- Através dela é possivel editar os links e sua descrição, bem como apagar links;<br>
    <br><br>


</details>

<br>


