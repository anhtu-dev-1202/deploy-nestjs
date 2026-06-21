// src/config/data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { databaseConfig } from 'config/database.config';

// 1. Tự động tìm file .env theo NODE_ENV (ví dụ: .env.production, .env.development)
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

// 2. Lấy object cấu hình đã được xử lý logic theo môi trường
const config = databaseConfig();

// 3. Export instance cho TypeORM CLI sử dụng
export default new DataSource(config);
