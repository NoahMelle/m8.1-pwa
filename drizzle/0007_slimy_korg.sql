CREATE TABLE `genres_to_performances_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`genre_id` int NOT NULL,
	`performance_id` int NOT NULL,
	CONSTRAINT `genres_to_performances_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `genres_to_performances_table` ADD CONSTRAINT `genres_to_performances_genre_id` FOREIGN KEY (`genre_id`) REFERENCES `genres_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `genres_to_performances_table` ADD CONSTRAINT `genres_to_performances_performance_id` FOREIGN KEY (`performance_id`) REFERENCES `performances_table`(`id`) ON DELETE no action ON UPDATE no action;