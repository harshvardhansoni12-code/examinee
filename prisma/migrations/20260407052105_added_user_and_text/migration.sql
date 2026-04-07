-- CreateTable
CREATE TABLE "Text" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
