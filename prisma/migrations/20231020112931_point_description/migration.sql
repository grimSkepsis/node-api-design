/*
  Warnings:

  - Added the required column `description` to the `UpdatePoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UpdatePoint" ADD COLUMN     "description" TEXT NOT NULL;
