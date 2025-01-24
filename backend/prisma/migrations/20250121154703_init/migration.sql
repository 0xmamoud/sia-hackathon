-- CreateTable
CREATE TABLE "Result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileId" TEXT NOT NULL,
    "datasourceAudit" JSONB,
    "datasourceExcel" JSONB
);
