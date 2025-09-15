-- CreateTable
CREATE TABLE "public"."Talent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "Talent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Talent" ADD CONSTRAINT "Talent_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
