INSERT INTO
  authors (`author_name`, `created_at`, `updated_at`)
VALUES
  ('村上春樹', CURRENT_TIMESTAMP, NULL),
  ('Kazuo Ishiguro', CURRENT_TIMESTAMP, NULL),
  ('Yukio Mishima', CURRENT_TIMESTAMP, NULL),
  ('東野圭吾', CURRENT_TIMESTAMP, NULL),
  ('Natsuo Kirino', CURRENT_TIMESTAMP, NULL);

INSERT INTO
  publishers (`publisher_name`, `created_at`, `updated_at`)
VALUES
  ('講談社', CURRENT_TIMESTAMP, NULL),
  ('新潮社', CURRENT_TIMESTAMP, NULL),
  ('Penguin Random House', CURRENT_TIMESTAMP, NULL),
  ('Tuttle Publishing', CURRENT_TIMESTAMP, NULL),
  ('HarperCollins', CURRENT_TIMESTAMP, NULL);

INSERT INTO
  book_status (`value`, `description`, `created_at`, `updated_at`)
VALUES
  ('UNPUBLISHED', '未出版', CURRENT_TIMESTAMP, NULL),
  ('PUBLISHED', '出版済み', CURRENT_TIMESTAMP, NULL),
  ('OUT_OF_PRINT', '絶版', CURRENT_TIMESTAMP, NULL);

INSERT INTO
  books (`isbn`, `title`, `price`, `status`, `author_id`, `publisher_id`, `published_at`, `created_at`, `updated_at`)
VALUES
  ('9783832185923', 'ノルウェイの森', 1000, 'PUBLISHED', 1, 1, '1987-09-04 00:00:00', CURRENT_TIMESTAMP, NULL),
  ('9784621303252', 'Never Let Me Go', 12000, 'OUT_OF_PRINT', 2, 3, '2005-03-03 00:00:00', CURRENT_TIMESTAMP, NULL),
  ('9780679750154', 'The Sailor Who Fell from Grace with the Sea', 5500, 'PUBLISHED', 3, 3, '1963-04-01 00:00:00', CURRENT_TIMESTAMP, NULL),
  ('9780312375065', '容疑者Xの献身', 780, 'PUBLISHED', 4, 4, '2005-08-06 00:00:00', CURRENT_TIMESTAMP, NULL),
  ('9784906649006', 'Out', NULL, 'UNPUBLISHED', 5, 5, '1997-06-20 00:00:00', CURRENT_TIMESTAMP, NULL);