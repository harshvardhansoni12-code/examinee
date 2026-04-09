-- CreateTable
CREATE TABLE "Mcq" (
    "id" SERIAL NOT NULL,
    "mcq" JSONB NOT NULL,
    "authorId" INTEGER NOT NULL,
    "textId" INTEGER NOT NULL,

    CONSTRAINT "Mcq_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mcq" ADD CONSTRAINT "Mcq_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mcq" ADD CONSTRAINT "Mcq_textId_fkey" FOREIGN KEY ("textId") REFERENCES "Text"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
