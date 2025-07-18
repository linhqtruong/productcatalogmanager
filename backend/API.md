# Product Catalog Backend API Documentation

Base URL: `http://localhost:8080`

---

## Endpoints

### 1. List All Products
**GET** `/products`
- **Description:** Returns a list of all products.
- **Response:**
```json
[
  {
    "productKey": 1,
    "retailer": "Stupell Industries",
    "brand": "Stupell Industries",
    "model": "SI-1234",
    "productName": "Wall Art",
    "productDescription": "Beautiful wall art.",
    "price": 49.99
  },
  ...
]
```

---

### 2. Get Product Details
**GET** `/products/{productKey}`
- **Description:** Returns full details for a single product.
- **Response:**
```json
{
  "productKey": 1,
  "retailer": "Stupell Industries",
  "brand": "Stupell Industries",
  "model": "SI-1234",
  "productName": "Wall Art",
  "productDescription": "Beautiful wall art.",
  "price": 49.99
}
```
- **404** if not found.

---

### 3. Add a New Product
**POST** `/products`
- **Description:** Adds a new product to the catalog.
- **Request Body:**
```json
{
  "retailer": "Fortress Building Products",
  "brand": "Fortress Building Products",
  "model": "FBP-5678",
  "productName": "Deck Railing",
  "productDescription": "Durable deck railing.",
  "price": 129.99
}
```
- **Response:**
```json
{
  "productKey": 2,
  "retailer": "Fortress Building Products",
  "brand": "Fortress Building Products",
  "model": "FBP-5678",
  "productName": "Deck Railing",
  "productDescription": "Durable deck railing.",
  "price": 129.99
}
```

---

### 4. Update a Product
**PUT** `/products/{productKey}`
- **Description:** Updates an existing product.
- **Request Body:** (same as POST)
- **Response:** Updated product object.
- **404** if not found.

---

### 5. Delete a Product
**DELETE** `/products/{productKey}`
- **Description:** Deletes a product by key.
- **Response:** `204 No Content` on success.

---

### 6. Brand Summary
**GET** `/products/brand-summary`
- **Description:** Returns a summary count of products grouped by brand.
- **Response:**
```json
[
  { "brand": "Stupell Industries", "count": 5 },
  { "brand": "Fortress Building Products", "count": 2 }
]
```

---

## Notes
- All endpoints return JSON.
- `productKey` is auto-generated for new products.
- For POST/PUT, all fields except `productKey` are required.
- Error responses use standard HTTP status codes (404, 400, etc).

---

## Example cURL Commands

**List products:**
```
curl http://localhost:8080/products
```

**Get product details:**
```
curl http://localhost:8080/products/1
```

**Add a product:**
```
curl -X POST http://localhost:8080/products -H "Content-Type: application/json" -d '{
  "retailer": "Test Retailer",
  "brand": "Test Brand",
  "model": "T-1000",
  "productName": "Test Product",
  "productDescription": "A test product.",
  "price": 99.99
}'
```

**Update a product:**
```
curl -X PUT http://localhost:8080/products/1 -H "Content-Type: application/json" -d '{
  "retailer": "Updated Retailer",
  "brand": "Updated Brand",
  "model": "U-2000",
  "productName": "Updated Product",
  "productDescription": "Updated description.",
  "price": 199.99
}'
```

**Delete a product:**
```
curl -X DELETE http://localhost:8080/products/1
```

**Brand summary:**
```
curl http://localhost:8080/products/brand-summary
``` 