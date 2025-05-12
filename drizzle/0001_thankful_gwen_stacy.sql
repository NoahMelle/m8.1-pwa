CREATE TABLE `performances_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`starts_at` timestamp NOT NULL,
	`ends_at` timestamp NOT NULL,
	`stage_id` int NOT NULL,
	CONSTRAINT `performances_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `performances_table` ADD CONSTRAINT `performances_table_stage_id_stages_table_id_fk` FOREIGN KEY (`stage_id`) REFERENCES `stages_table`(`id`) ON DELETE cascade ON UPDATE no action;