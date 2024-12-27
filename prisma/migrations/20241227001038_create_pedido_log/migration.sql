-- CreateTable
CREATE TABLE "pedidoLog" (
    "id" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "status_anterior" TEXT NOT NULL,
    "novo_status" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidoLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pedidoLog" ADD CONSTRAINT "pedidoLog_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id_pedido") ON DELETE RESTRICT ON UPDATE CASCADE;
