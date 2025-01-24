/*
  Warnings:

  - You are about to drop the `Result` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Result";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Lease" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "processId" TEXT NOT NULL,
    "datasourceAudit" JSONB,
    "datasourceExcel" JSONB,
    "docResume" TEXT,
    "docAlert" JSONB
);
