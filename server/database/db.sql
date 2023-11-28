create database if not exists `status_updates`;

use `status_updates`;

CREATE TABLE `users` (
    `user_id` INT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL
);

CREATE TABLE `status_updates` (
    `update_id` INT PRIMARY KEY,
    `user_id` INT,
    `status_text` VARCHAR(1000) NOT NULL,
    `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- select su.update_id, su.user_id, su.status_text, users.username
--             from status_updates as su
--             join users on status_updates.update_id on users.u_id
--             limit 10;

select su.update_id, su.user_id, su.status_text, users.username 
from `status_updates` as su
join users on su.user_id = users.user_id
limit 10;

create table `notifications` (
    `notify_id` int(11) primary key,
    `notify_by` int(11) not null,
    `type` varchar(255) not null,
    `notify_to` varchar(255) not null,
    `notify_msg` varchar(255) not null,
    `post_id` BIGINT(20) not null,
    `status` enum ('read', 'unread') not null default 'unread',
    `created_at` timestamp not null default CURRENT_TIMESTAMP
);

-- this creates a foreign key automatically
create index `idx_notify_to` on users(`user_id`)

select notifications.* from notifications

drop table `notifications`;
use `status_updates`;
select
    n.notify_by, n.type, 
    n.notify_to, n.notify_msg, n.post_id, 
    users.username  
from `notifications` as n
join users on n.notify_to = users.username;

-- this is what ai gave me, and i can fix all the errors

-- SELECT 
--   n.id,
--   n.notify_by,
--   n.type, 
--   n.notify_to,
--   n.notify_msg,
--   n.post_id,
--   n.created_at,
--   users.username 
-- FROM notifications n
-- JOIN users ON n.notify_to = users.username
-- WHERE n.notify_to = ?
-- ORDER BY n.created_at DESC;

use `status_updates`;
-- SELECT su.*, u.username
-- FROM status_updates AS su
-- JOIN users AS u ON su.user_id = u.user_id
-- WHERE u.user_id = ?

alter table `status_updates`
    add column `likes` int(11) not null after `status_text`;

alter table `status_updates`
    add column `shares` int(11) not null after `status_text`;

alter table `status_updates`
    drop column `likes`;