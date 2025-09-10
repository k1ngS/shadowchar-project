-- CreateTable
CREATE TABLE "public"."Character" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "ancestry" TEXT NOT NULL,
    "strength" INTEGER NOT NULL DEFAULT 10,
    "agility" INTEGER NOT NULL DEFAULT 10,
    "intellect" INTEGER NOT NULL DEFAULT 10,
    "will" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
