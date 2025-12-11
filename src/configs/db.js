import mysql from 'mysql2/promise'

import { DB_CONFIG } from './constants.js'

export const pool = mysql.createPool(DB_CONFIG)

export default pool
