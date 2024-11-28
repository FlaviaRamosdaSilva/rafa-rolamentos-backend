-- CreateTable
CREATE TABLE "compras" (
    "id_compras" TEXT NOT NULL,
    "fornecedor" TEXT NOT NULL,
    "valor_total_compra" DECIMAL(65,30) NOT NULL,
    "status_compra" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "compras_pkey" PRIMARY KEY ("id_compras")
);

-- CreateTable
CREATE TABLE "entradaProdutoItem" (
    "id_item_entrada" TEXT NOT NULL,
    "comprasId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "custo" DECIMAL(65,30) NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "entradaProdutoItem_pkey" PRIMARY KEY ("id_item_entrada")
);

-- AddForeignKey
ALTER TABLE "entradaProdutoItem" ADD CONSTRAINT "entradaProdutoItem_comprasId_fkey" FOREIGN KEY ("comprasId") REFERENCES "compras"("id_compras") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entradaProdutoItem" ADD CONSTRAINT "entradaProdutoItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;
