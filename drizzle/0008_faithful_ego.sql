CREATE TABLE `articles_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `articles_table_id` PRIMARY KEY(`id`)
);
