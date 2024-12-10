/*
  Warnings:

  - Added the required column `total_item` to the `entradaProdutoItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "entradaProdutoItem" ADD COLUMN     "total_item" DECIMAL(65,30) NOT NULL;
