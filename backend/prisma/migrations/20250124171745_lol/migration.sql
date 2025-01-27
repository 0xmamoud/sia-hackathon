/*
  Warnings:

  - You are about to drop the `Lease` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Lease";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "lease" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leaseName" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "datasourceAudit" JSONB,
    "datasourceExcel" JSONB,
    "docResume" TEXT,
    "docAlert" JSONB
);
