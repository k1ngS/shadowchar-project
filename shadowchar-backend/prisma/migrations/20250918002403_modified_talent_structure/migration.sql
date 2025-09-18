/*
  Warnings:

  - You are about to drop the column `characterId` on the `Talent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `Talent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Talent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tier` to the `Talent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Talent" DROP CONSTRAINT "Talent_characterId_fkey";

-- AlterTable
ALTER TABLE "public"."Character" ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Talent" DROP COLUMN "characterId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "effects" JSONB,
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "nameEn" TEXT,
ADD COLUMN     "prerequisite" JSONB,
ADD COLUMN     "tier" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."CharacterTalent" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "talentId" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CharacterTalent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CharacterTalent_characterId_talentId_key" ON "public"."CharacterTalent"("characterId", "talentId");

-- CreateIndex
CREATE UNIQUE INDEX "Talent_key_key" ON "public"."Talent"("key");

-- AddForeignKey
ALTER TABLE "public"."CharacterTalent" ADD CONSTRAINT "CharacterTalent_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CharacterTalent" ADD CONSTRAINT "CharacterTalent_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "public"."Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
