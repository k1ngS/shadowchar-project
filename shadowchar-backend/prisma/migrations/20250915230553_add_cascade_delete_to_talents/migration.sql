-- DropForeignKey
ALTER TABLE "public"."Talent" DROP CONSTRAINT "Talent_characterId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Talent" ADD CONSTRAINT "Talent_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
