-- CreateTable
CREATE TABLE "Typology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "comment" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Typology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelfType" (
    "id" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SelfType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "mbtiType" TEXT NOT NULL,
    "choices" TEXT[],
    "typologyId" TEXT NOT NULL,
    "selfTypeId" TEXT NOT NULL,
    "cognitiveId" TEXT NOT NULL,
    "fourLettersId" TEXT NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CognitiveFunctions" (
    "id" TEXT NOT NULL,
    "ne" INTEGER NOT NULL,
    "ni" INTEGER NOT NULL,
    "se" INTEGER NOT NULL,
    "si" INTEGER NOT NULL,
    "te" INTEGER NOT NULL,
    "ti" INTEGER NOT NULL,
    "fe" INTEGER NOT NULL,
    "fi" INTEGER NOT NULL,

    CONSTRAINT "CognitiveFunctions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FourLetters" (
    "id" TEXT NOT NULL,
    "extroversion" INTEGER NOT NULL,
    "introversion" INTEGER NOT NULL,
    "sensing" INTEGER NOT NULL,
    "intuition" INTEGER NOT NULL,
    "thinking" INTEGER NOT NULL,
    "feeling" INTEGER NOT NULL,
    "perceiving" INTEGER NOT NULL,
    "judging" INTEGER NOT NULL,

    CONSTRAINT "FourLetters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SelfType_userId_key" ON "SelfType"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_cognitiveId_key" ON "Result"("cognitiveId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_fourLettersId_key" ON "Result"("fourLettersId");

-- AddForeignKey
ALTER TABLE "Typology" ADD CONSTRAINT "Typology_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelfType" ADD CONSTRAINT "SelfType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_typologyId_fkey" FOREIGN KEY ("typologyId") REFERENCES "Typology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_selfTypeId_fkey" FOREIGN KEY ("selfTypeId") REFERENCES "SelfType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_cognitiveId_fkey" FOREIGN KEY ("cognitiveId") REFERENCES "CognitiveFunctions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_fourLettersId_fkey" FOREIGN KEY ("fourLettersId") REFERENCES "FourLetters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
