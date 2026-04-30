/*
  Warnings:

  - The primary key for the `devices` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `environment_logs` DROP FOREIGN KEY `environment_logs_device_id_fkey`;

-- DropForeignKey
ALTER TABLE `ir_sensor_values` DROP FOREIGN KEY `ir_sensor_values_device_id_fkey`;

-- DropIndex
DROP INDEX `environment_logs_device_id_fkey` ON `environment_logs`;

-- DropIndex
DROP INDEX `ir_sensor_values_device_id_fkey` ON `ir_sensor_values`;

-- AlterTable
ALTER TABLE `devices` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `environment_logs` MODIFY `device_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ir_sensor_values` MODIFY `device_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `environment_logs` ADD CONSTRAINT `environment_logs_device_id_fkey` FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ir_sensor_values` ADD CONSTRAINT `ir_sensor_values_device_id_fkey` FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
