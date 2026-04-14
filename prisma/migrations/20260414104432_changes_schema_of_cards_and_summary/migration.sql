/*
  Warnings:

  - You are about to drop the column `mcq` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `mcq` on the `Summary` table. All the data in the column will be lost.
  - Added the required column `cards` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Summary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "mcq",
ADD COLUMN     "cards" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Summary" DROP COLUMN "mcq",
ADD COLUMN     "summary" JSONB NOT NULL;
