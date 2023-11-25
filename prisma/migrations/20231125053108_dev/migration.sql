-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "UserDetail" (
    "userId" INTEGER NOT NULL,
    "ssn" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT,
    "website" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER'
);

-- CreateTable
CREATE TABLE "UserStatistics" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserStatistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAddress" (
    "id" SERIAL NOT NULL,
    "postalCode" TEXT,
    "streetName" TEXT,
    "city" TEXT,
    "country" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "years" INTEGER,
    "months" INTEGER,
    "order" INTEGER,
    "title" TEXT,
    "description" TEXT,
    "editedAt" TIMESTAMP(3),
    "published" BOOLEAN DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_userId_key" ON "UserDetail"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_ssn_key" ON "UserDetail"("ssn");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_userName_key" ON "UserDetail"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_email_key" ON "UserDetail"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserStatistics_userId_key" ON "UserStatistics"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_userId_key" ON "UserAddress"("userId");

-- AddForeignKey
ALTER TABLE "UserDetail" ADD CONSTRAINT "UserDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStatistics" ADD CONSTRAINT "UserStatistics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserDetail"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserDetail"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserDetail"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
