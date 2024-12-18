-- CreateTable
CREATE TABLE "estoqueLog" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "estoqueLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "estoqueLog" ADD CONSTRAINT "estoqueLog_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;
