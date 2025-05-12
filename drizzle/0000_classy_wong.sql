CREATE TABLE `stages_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(1024),
	`x_position` int NOT NULL DEFAULT 0,
	`y_position` int NOT NULL DEFAULT 0,
	CONSTRAINT `stages_table_id` PRIMARY KEY(`id`)
);
