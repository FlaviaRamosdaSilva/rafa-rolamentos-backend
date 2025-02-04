/*
  Warnings:

  - Made the column `categoria` on table `produto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "produto" ALTER COLUMN "categoria" SET NOT NULL;
