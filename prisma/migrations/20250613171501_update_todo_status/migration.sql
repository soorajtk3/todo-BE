/*
  Warnings:

  - You are about to drop the column `isDone` on the `Todo` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "isDone",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
