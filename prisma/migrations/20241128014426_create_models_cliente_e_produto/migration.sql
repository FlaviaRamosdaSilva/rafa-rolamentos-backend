-- CreateTable
CREATE TABLE "cliente" (
    "id_cliente" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "produto" (
    "id_produto" TEXT NOT NULL,
    "codigo_produto" TEXT NOT NULL,
    "descricao_produto" TEXT NOT NULL,
    "custo" DECIMAL(65,30) NOT NULL,
    "preco_nachi" DECIMAL(65,30) NOT NULL,
    "preco_distribuidor" DECIMAL(65,30) NOT NULL,
    "preco_lojista" DECIMAL(65,30) NOT NULL,
    "quantidade_total" INTEGER NOT NULL,
    "quantidade_minima" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id_produto")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_email_key" ON "cliente"("email");

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
