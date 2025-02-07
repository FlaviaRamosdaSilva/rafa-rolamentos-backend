<h4>📌 Rafa Rolamentos</h4>

O "Rafa Rolamentos" é um sistema de gerenciamento de estoque que serve para controlar o estoque, inserir compras e realizar vendas dentro do sistema, deixando o estoque de rolamentos mais organizado. Ele ajudará a organizar o estoque para que não falte mercadoria e dará a visão para compras antecipadas, além de controle das vendas, identificando o que foi vendido e ainda falta pagamento.

<h4>🚀 Tecnologias Utilizadas</h4>

<strong>Frontend</strong>

- Linguagem: TypeScript

- Framework: React

- Bibliotecas:

  - @mui/material, @mui/icons-material, @mui/lab, @mui/x-date-pickers (Material UI)

  - react-router-dom (Gerenciamento de Rotas)

  - axios (Requisições HTTP)

  - react-toastify (Notificações)

  - styled-components (Estilização)

  - react-hook-form e yup (Validação de Formulários)

<strong>Backend</strong>

- Linguagem: TypeScript

- Framework: NestJS

- Banco de Dados: PostgreSQL

- ORM: Prisma

- Autenticação: JWT e Passport

- Outros:

  - class-validator e class-transformer (Validação e Transformação de Dados)

  - bcrypt (Criptografia de Senhas)

  - nodemailer e hbs (Envio de E-mails)

  - rxjs (Programação Reativa)

  - dotenv (Configuração de Variáveis de Ambiente)

<h4>📜 Regras de Negócio e funcionalidades do sistema</h4>

- Criado para um cliente único, com apenas um acesso.
- No caso de esquecer a senha, o cliente digita seu e-mail e receberá uma link para gravar nova senha.
- A senha precisa ter no mínimo 6 dígitos.
- Ao entrar no sistema, você estará na tela principal, e deve navegar pelo menu no lado esquerdo;
- No item de compra você pode verificar todas as compras realizadas pelo usuário, assim como acessar seus detalhes, e realizar nova compra. Na barra de pesquisa que aparece, é possível pesquisar pelo nome do fornecedor. Porque não tem alteração e exclusão de compras? de acordo com o usuário, ele somente incerirá uma nova compra após a chegada da mesma no estabelecimento, com nota fiscal em mãos. Esta parte servirá para dar entrada no estoque e saber a origem da compra assim como a particularidade dos valores.
- Ao dar entrada em uma compra, o backend verifica o preço de custo inserido no produto; se o preço de custo for inferior ao cadastrado para aquele item, apenas será alterado a quantidade em estoque. Se o preço de custo da nova compra for superior ao custo cadastrado em estoque, o sistema atualiza o valor de venda da seguinte maneira: o preço de lojista será 40% acima do custo, enquanto o preço de distribuidor será 25% acima do valor de custo.
- Temos também a alteração de estoque (quantidade) salva no histórico do produto quando inserido uma compra, alterado manualmente o estoque, por saída/venda de produto e retorno por cancelamento de venda;;
- Toda nova compra inicia com status de iniciado e no botão "ver detalhe" é possível visualizar a compra e alterar o seu status.
- Ao inserir uma nova compra, o campo Fornecedor deve ser digitado (não teremos cadastro de fornecedor) e em seguida adicionado um item que já esteja criado; no modal é escolhido o produto comprado, a quantidade e o custo do item. Não é possível inserir dois itens iguais. Durante a inserção dos dados da compra é possível alterar ou excluir um item adicionado. Finalizando a compra será redirecionado a lista de compras.
- No cadastro de produtos, é possível inserir um produto com quantidade zerada e apenas determinado a sua quantidade mínima, que também pode ser zarada se preferir. Após a criação de produtos você será redirecionado para o estoque.
- No estoque é possível visualizar todos os produtos, alterar e excluir um item. Na barra de pesquisa que aparece, é possível pesquisar pelo nome do produto. Comforme solicitação do cliente, não é informado na lista o valor de venda pois o usuário costuma mostrar seu estoque aos clientes e cada item possui dois preços.
- Ao editar um produto você será direcionado para os dados do item, assim como a informação de seu histórico.
- Quando um produto estiver abaixo da sua quantidade mínima estipulada, este item ficará em vermelho.
- Ao clicar em excluir item, abrirá um modal questionando a certeza da decisão.
- No item Clientes, temos a lista de clientes assim como a opção de alterar e criar um cliente. Para manter o histórico, não é possível deletar um cliente. Na barra de pesquisa que aparece, é possível pesquisar pelo nome do cliente.
- No item Vendas, podemos visualizar todas as vendas realizadas, assim como um filtro por status da venda, tipo de cliente e uma barra de pesquisa onde é possível pesquisar a venda pelo nome do cliente. Por questão de histórico não é possível excluir uma venda, mas é possível cancelar. Após cancelamento da venda não é mais possível alterar seu status.
- Como o usuário recebe algumas cotações que acabam não virando venda de verdade, iniciamos um pedido de venda com status de Pendente e o estoque não é alterado. Somente após a aprovação da venda é que o estoque é alterado, dando baixa nos produtos vendidos.
- Ao aprovar um pedido, é verificado se o mesmo possui estoque para a aprovação e em caso negativo aparecerá uma mensagem de erro "quantidade de estoque insuficiente" e o status permanece inalterado.
- Após aprovação temos outros status que o cliente pode utilizar para dar andamento nas suas vendas e até mesmo nos seus recebimentos, consultando quem ainda não realizou pagamento.
- Ao iniciar uma venda, o usuário precisa inserir um cliente já cadastrado, selecionar o tipo de venda que ele fará para este cliente (venda de lojista para compras pequenas, venda de distribuidor para vendas com maiores quantidades); é póssível inserir um valor de desconto geral (com o motivo) que será dado no final da compra; Temos uma barra para busca de produto por nome e abaixo a listagem de todos os itens do estoque. Para adicionar um item é necessário flegar no canto esquerdo e após inserir a quantidade. Se não inserir nenhuma quantidade para o item flegado, ele entende que será apenas um 1 unidade.
- Por último temos o botão de Logout para sair do sistema.

<strong>Funcionalidades Futuras</strong>

- Ao concluir uma venda o backend grava o custo total daquele pedido e o lucro bruto daquela venda. Estes dados darão embasamento para um dash onde será possível consultar os dados do mês como valor total das compras, valor total das vendas, lucro no mês e custos do mês;
- No backend também está sendo gravado o histórico das alterações de status de cada venda, sendo possível verificar quando o cliente realizou o pagamento (alteração do status para "Finalizado e Pago") gerando assim um controle dos recebimentos para o usuário.

<strong>Melhorias a serem feitas</strong>

- O sistema ainda precisa melhorar o design e deixa-lo mais atraente e mais inovador;
- Os filtros que hoje só procuram pelo nome do produto, podem também ser alterados para filtragem por código e categoria.
- Com o passar do tempo o usuário irá nos passar outros tópicos de melhoria.

<h4>🛠️ Instalação e Configuração</h4>

1.  Faça um clone do repositório;
2.  realize a instalação das dependências com "npm install";
3.  Configure as variáveis de ambiente (.env):
    - EMAIL_HOST=smtp.gmail.com
    - EMAIL_PORT=587
    - EMAIL_USERNAME=xxxxxxxxxx
    - EMAIL_PASS=xxxxxxxxxx
    - PORT=3001
4.  Rode o projeto: "npm run start:dev"

<h4>🔄 Deploy e Links</h4>

- Figma do projeto: <a href= 'https://www.figma.com/design/MR7UL1tJslImeBFGAcEBdG/Pedido-Rolamento?node-id=203-17&t=XiomCHqB9gCZY0fU-0'>Rafa Rolamentos</a>
- O logo também foi desenvolvido por mim.
- O deploy do backend está na Vercel, site: <a>rafa-rolamentos-backend.vercel.app</a>
- O deploy do frontend está na Vercel, site: <a>rafa-rolamentos.vercel.app
  </a>
- Já o banco de dados (PostgresSQL) foi hospedado na Neon.tech, gratuitamente;

<h4>📞 Contato</h4>

- Nome: Flávia Ramos da Silva
- Telefone:+55 (51) 993900938
- E-mail: didi.flavia@gmail.com
