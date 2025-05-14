ALTER TABLE `performances_table` ADD `image_url` varchar(512) DEFAULT 'https://placehold.co/200x200' NOT NULL;--> statement-breakpoint
ALTER TABLE `performances_table` ADD `description` varchar(1024);--> statement-breakpoint
ALTER TABLE `performances_table` ADD `dutch_description` varchar(1024);