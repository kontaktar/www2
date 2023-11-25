-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserStatistics" DROP CONSTRAINT "UserStatistics_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserStatistics" ADD CONSTRAINT "UserStatistics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
