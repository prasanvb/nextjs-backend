/*
  Warnings:

  - You are about to drop the column `fullName` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[FullName,role]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `FullName` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_fullName_role_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "fullName",
ADD COLUMN     "FullName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_FullName_role_key" ON "Users"("FullName", "role");
