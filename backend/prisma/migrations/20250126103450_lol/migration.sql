/*
  Warnings:

  - Added the required column `templateAuditPath` to the `lease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `templateExcelPath` to the `lease` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_lease" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leaseName" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "datasourceAudit" JSONB,
    "datasourceExcel" JSONB,
    "docResume" TEXT,
    "docAlert" JSONB,
    "templateAuditPath" TEXT NOT NULL,
    "templateExcelPath" TEXT NOT NULL
);
INSERT INTO "new_lease" ("createdAt", "datasourceAudit", "datasourceExcel", "docAlert", "docResume", "id", "leaseName", "processId") SELECT "createdAt", "datasourceAudit", "datasourceExcel", "docAlert", "docResume", "id", "leaseName", "processId" FROM "lease";
DROP TABLE "lease";
ALTER TABLE "new_lease" RENAME TO "lease";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
