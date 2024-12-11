/*
  Warnings:

  - Added the required column `preco_venda` to the `pedidoProduto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_produto` to the `pedidoProduto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pedidoProduto" ADD COLUMN     "preco_venda" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "total_produto" DECIMAL(65,30) NOT NULL;
