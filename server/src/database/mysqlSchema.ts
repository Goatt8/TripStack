export const mysqlSchemaStatements = [
  `
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT,
      login_id VARCHAR(191) NOT NULL DEFAULT '',
      username VARCHAR(191) NOT NULL,
      role VARCHAR(32) NOT NULL DEFAULT 'consumer',
      email VARCHAR(191) NOT NULL DEFAULT '',
      password_hash VARCHAR(255) NOT NULL DEFAULT '',
      display_name VARCHAR(191) NOT NULL DEFAULT '',
      bio TEXT NOT NULL,
      profile_image_url TEXT NOT NULL,
      avatar_url TEXT NOT NULL,
      follower_count INT NOT NULL DEFAULT 0,
      is_admin TINYINT(1) NOT NULL DEFAULT 0,
      trust_score INT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY users_login_id_unique (login_id),
      UNIQUE KEY users_email_unique (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  `
    CREATE TABLE IF NOT EXISTS guidebooks (
      id INT NOT NULL AUTO_INCREMENT,
      creator_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      country VARCHAR(191) NOT NULL DEFAULT '',
      region VARCHAR(191) NOT NULL,
      cover_image_url TEXT NOT NULL,
      map_image_url TEXT NOT NULL,
      map_center_lat DOUBLE NULL,
      map_center_lon DOUBLE NULL,
      print_count INT NOT NULL DEFAULT 0,
      price INT NOT NULL DEFAULT 12800,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY guidebooks_creator_id_index (creator_id),
      CONSTRAINT guidebooks_creator_id_foreign
        FOREIGN KEY (creator_id) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  `
    CREATE TABLE IF NOT EXISTS location_presets (
      id INT NOT NULL AUTO_INCREMENT,
      country VARCHAR(191) NOT NULL,
      city VARCHAR(191) NOT NULL,
      map_center_lat DOUBLE NOT NULL,
      map_center_lon DOUBLE NOT NULL,
      fallback_map_image_url TEXT NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      PRIMARY KEY (id),
      UNIQUE KEY location_presets_country_city_unique (country, city)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  `
    CREATE TABLE IF NOT EXISTS guidebook_route_points (
      id INT NOT NULL AUTO_INCREMENT,
      guidebook_id INT NOT NULL,
      point_order INT NOT NULL,
      title VARCHAR(255) NOT NULL DEFAULT '',
      x DOUBLE NOT NULL,
      y DOUBLE NOT NULL,
      PRIMARY KEY (id),
      KEY guidebook_route_points_guidebook_id_index (guidebook_id),
      CONSTRAINT guidebook_route_points_guidebook_id_foreign
        FOREIGN KEY (guidebook_id) REFERENCES guidebooks(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  `
    CREATE TABLE IF NOT EXISTS guidebook_blocks (
      id INT NOT NULL AUTO_INCREMENT,
      guidebook_id INT NOT NULL,
      step_order INT NOT NULL,
      place_name VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      image_url TEXT NOT NULL,
      PRIMARY KEY (id),
      KEY guidebook_blocks_guidebook_id_index (guidebook_id),
      CONSTRAINT guidebook_blocks_guidebook_id_foreign
        FOREIGN KEY (guidebook_id) REFERENCES guidebooks(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  `
    CREATE TABLE IF NOT EXISTS custom_prints (
      id INT NOT NULL AUTO_INCREMENT,
      consumer_id INT NOT NULL,
      guidebook_id INT NOT NULL,
      selected_layout_type VARCHAR(191) NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY custom_prints_consumer_id_index (consumer_id),
      KEY custom_prints_guidebook_id_index (guidebook_id),
      CONSTRAINT custom_prints_consumer_id_foreign
        FOREIGN KEY (consumer_id) REFERENCES users(id),
      CONSTRAINT custom_prints_guidebook_id_foreign
        FOREIGN KEY (guidebook_id) REFERENCES guidebooks(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  `
    CREATE TABLE IF NOT EXISTS print_cart_items (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      guidebook_id INT NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY print_cart_items_user_guidebook_unique (user_id, guidebook_id),
      KEY print_cart_items_guidebook_id_index (guidebook_id),
      CONSTRAINT print_cart_items_user_id_foreign
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT print_cart_items_guidebook_id_foreign
        FOREIGN KEY (guidebook_id) REFERENCES guidebooks(id) ON DELETE CASCADE,
      CONSTRAINT print_cart_items_quantity_positive CHECK (quantity > 0)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  `
    CREATE TABLE IF NOT EXISTS orders (
      id INT NOT NULL AUTO_INCREMENT,
      consumer_id INT NOT NULL,
      guidebook_id INT NOT NULL,
      custom_print_id INT NULL,
      quantity INT NOT NULL DEFAULT 1,
      total_price INT NOT NULL DEFAULT 0,
      status ENUM('pending', 'producing', 'shipping', 'completed') NOT NULL DEFAULT 'pending',
      shipping_memo TEXT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY orders_consumer_id_index (consumer_id),
      KEY orders_guidebook_id_index (guidebook_id),
      KEY orders_custom_print_id_index (custom_print_id),
      CONSTRAINT orders_consumer_id_foreign
        FOREIGN KEY (consumer_id) REFERENCES users(id),
      CONSTRAINT orders_guidebook_id_foreign
        FOREIGN KEY (guidebook_id) REFERENCES guidebooks(id),
      CONSTRAINT orders_custom_print_id_foreign
        FOREIGN KEY (custom_print_id) REFERENCES custom_prints(id),
      CONSTRAINT orders_quantity_positive CHECK (quantity > 0)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
];
