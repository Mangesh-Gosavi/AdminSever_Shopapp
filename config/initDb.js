const connection = require("./db");

const tables = [
  {
    name: "admin",
    query: `
      CREATE TABLE IF NOT EXISTS admin (
        id VARCHAR(20),
        name VARCHAR(40),
        phone VARCHAR(255),
        email VARCHAR(100) UNIQUE PRIMARY KEY,
        password VARCHAR(255),
        date DATE
      )`,
  },
  {
    name: "users",
    query: `
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(20) PRIMARY KEY,
        name VARCHAR(100),
        phone VARCHAR(20),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        address VARCHAR(255),
        date DATE
      )`,
  },
  {
    name: "product",
    query: `
      CREATE TABLE IF NOT EXISTS product (
        productid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        image VARCHAR(255),
        brand VARCHAR(20),
        product VARCHAR(20),
        boughtprice INT,
        price INT,
        discount INT,
        size VARCHAR(20),
        stock INT,
        description VARCHAR(100)
      )`,
  },
  {
    name: "orderdetails",
    query: `
      CREATE TABLE IF NOT EXISTS orderdetails (
        orderid VARCHAR(50) PRIMARY KEY,
        userid VARCHAR(20),
        total INT,
        status VARCHAR(30),
        address VARCHAR(255),
        date DATE
      )`,
  },
  {
    name: "orderitem",
    query: `
      CREATE TABLE IF NOT EXISTS orderitem (
        itemid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        orderid VARCHAR(50),
        productid INT,
        product VARCHAR(50),
        brand VARCHAR(20),
        size VARCHAR(20),
        price INT,
        quantity INT,
        image VARCHAR(255)
      )`,
  },
  {
    name: "reviews",
    query: `
      CREATE TABLE IF NOT EXISTS reviews (
        reviewid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userid VARCHAR(20),
        productid INT,
        rating INT,
        comment VARCHAR(255),
        date DATE
      )`,
  },
  {
    name: "soldproduct",
    query: `
      CREATE TABLE IF NOT EXISTS soldproduct (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        productid INT,
        brand VARCHAR(20),
        size VARCHAR(20),
        boughtprice INT,
        price INT,
        soldquantity INT,
        date DATE
      )`,
  },
];

function initDb() {
  tables.forEach(({ name, query }) => {
    connection.query(query, (err) => {
      if (err) {
        console.error(`Error creating table '${name}':`, err.message);
      } else {
        console.log(`Table '${name}' ready`);
      }
    });
  });
}

module.exports = initDb;
