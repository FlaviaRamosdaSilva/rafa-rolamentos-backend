-- CreateTable
CREATE TABLE "pedido" (
    "id_pedido" TEXT NOT NULL,
    "tipo_cliente" TEXT NOT NULL,
    "preco_total" DECIMAL(65,30) NOT NULL,
    "custo_total" DECIMAL(65,30) NOT NULL,
    "lucro_bruto" DECIMAL(65,30) NOT NULL,
    "desconto" DECIMAL(65,30) NOT NULL,
    "motivo_desconto" TEXT NOT NULL,
    "preco_final" DECIMAL(65,30) NOT NULL,
    "status_pedido" TEXT NOT NULL,
    "quantidade_total_produtos" INTEGER NOT NULL,
    "clienteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "pedidoProduto" (
    "id_pedido_produto" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "pedidoProduto_pkey" PRIMARY KEY ("id_pedido_produto")
);

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidoProduto" ADD CONSTRAINT "pedidoProduto_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id_pedido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidoProduto" ADD CONSTRAINT "pedidoProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;
