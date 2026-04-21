-- CreateTable
CREATE TABLE "McqResult" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "textId" INTEGER NOT NULL,
    "mcqId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "McqResult_id_key" ON "McqResult"("id");

-- AddForeignKey
ALTER TABLE "McqResult" ADD CONSTRAINT "McqResult_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "McqResult" ADD CONSTRAINT "McqResult_textId_fkey" FOREIGN KEY ("textId") REFERENCES "Text"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "McqResult" ADD CONSTRAINT "McqResult_mcqId_fkey" FOREIGN KEY ("mcqId") REFERENCES "Mcq"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
