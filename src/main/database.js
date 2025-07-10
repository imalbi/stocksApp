'use strict'
import { join } from 'path'
import { app } from 'electron'
import Database from 'better-sqlite3'
let db

function initializeDatabase() {
  const userDataPath = app.getPath('userData')
  const dbPath = join(userDataPath, 'magazzino.db')
  db = new Database(dbPath)
  db.exec(`CREATE TABLE IF NOT EXISTS products (
    barCode TEXT PRIMARY KEY,
    name TEXT NOT NULL
  )`)
  console.log('Database initialized at:', dbPath)
}

function addProduct(productData) {
  console.log('addProduct chiamato con:', productData)
  const stmt = db.prepare(`INSERT INTO products (barCode, name) VALUES (?, ?)`)
  const info = stmt.run(productData.barCode, productData.name)
  return info.changes > 0
}

function getAllProducts() {
  console.log('getAllProducts chiamato')
  const stmt = db.prepare('SELECT * FROM products')
  return stmt.all()
}

function getProductById(barCode) {
  console.log('getProductById chiamato con:', barCode)
  const stmt = db.prepare('SELECT * FROM products WHERE barCode = ?')
  return stmt.get(barCode)
}

export default {
  initializeDatabase,
  addProduct,
  getAllProducts,
  getProductById
}
