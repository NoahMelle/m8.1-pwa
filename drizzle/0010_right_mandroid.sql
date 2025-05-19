ALTER TABLE `articles_table` RENAME COLUMN `title` TO `english_title`;--> statement-breakpoint
ALTER TABLE `articles_table` RENAME COLUMN `content` TO `english_content`;--> statement-breakpoint
ALTER TABLE `articles_table` ADD `dutch_title` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `articles_table` ADD `dutch_content` text;