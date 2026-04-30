/*
  Warnings:

  - You are about to drop the column `temperature_qmp` on the `environment_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `environment_logs` DROP COLUMN `temperature_qmp`;
