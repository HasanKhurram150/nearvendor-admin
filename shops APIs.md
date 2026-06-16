### 1. GET `/api/admin/shop-categories`
**Get all shop categories with their item categories (SUPERADMIN only)**

**Code**: 200

**Response body**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": [
    {
      "id": "d8cc6706-0d0d-44db-b06c-7c77533d2604",
      "createdAt": "2026-05-22T21:14:14.372Z",
      "updatedAt": "2026-05-22T21:14:14.372Z",
      "name": "Automotive",
      "iconUrl": null,
      "parentId": null,
      "itemCategories": [],
      "parent": null,
      "shopCount": 1
    },
    {
      "id": "8283b1c4-2c2c-41b8-830f-74134d5d3c23",
      "createdAt": "2026-05-22T21:14:14.353Z",
      "updatedAt": "2026-05-22T21:14:14.353Z",
      "name": "Building Material",
      "iconUrl": null,
      "parentId": null,
      "itemCategories": [],
      "parent": null,
      "shopCount": 0
    },
    {
      "id": "cea64f64-fef3-4e9a-9f88-79308722d7d1",
      "createdAt": "2026-05-22T21:14:14.362Z",
      "updatedAt": "2026-05-22T21:14:14.362Z",
      "name": "Electronics",
      "iconUrl": null,
      "parentId": null,
      "itemCategories": [],
      "parent": null,
      "shopCount": 2
    },
    {
      "id": "85914fa3-5123-4b2d-b371-7ca43612ec5f",
      "createdAt": "2026-05-22T21:14:14.340Z",
      "updatedAt": "2026-05-22T21:14:14.340Z",
      "name": "Pharmacy",
      "iconUrl": null,
      "parentId": null,
      "itemCategories": [],
      "parent": null,
      "shopCount": 1
    }
  ]
}
```

### 2. POST `/api/admin/shop-categories`
**Create a shop category (SUPERADMIN only)**

**Request body**:
```json
{
  "name": "Grocery Store",
  "iconUrl": "https://cdn.example.com/icon.png",
  "parentId": "string"
}
```

**Response body**:
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Shop category created successfully",
  "data": {
    "name": "Grocery Store",
    "iconUrl": "https://cdn.example.com/icon.png",
    "deletedAt": null,
    "parentId": null,
    "id": "50e4961c-8c1e-4d14-af83-f5b54cfae0e7",
    "createdAt": "2026-06-16T13:45:28.654Z",
    "updatedAt": "2026-06-16T13:45:28.654Z"
  }
}
```

### 3. PATCH `/api/admin/shop-categories/{id}`
**Update a shop category (SUPERADMIN only)**

**Parameters**:
- `id` (required)

**Request body**:
```json
{
  "name": "Grocery Store",
  "iconUrl": "https://cdn.example.com/icon.png",
  "parentId": "string"
}
```

### 4. DELETE `/api/admin/shop-categories/{id}`
**Delete a shop category (SUPERADMIN only)**

**Parameters**:
- `id` (required)

### 5. GET `/api/admin/shop-categories/{id}/shops`
**Get shops under a specific shop category (SUPERADMIN only)**

**Parameters**:
- `id` (required)
- `page`: number
- `limit`: number

**Response Body**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "shopCategory": {
      "id": "d8cc6706-0d0d-44db-b06c-7c77533d2604",
      "createdAt": "2026-05-22T21:14:14.372Z",
      "updatedAt": "2026-05-22T21:14:14.372Z",
      "name": "Automotive",
      "iconUrl": null,
      "parentId": null
    },
    "shops": [
      {
        "id": "433a9272-14dd-4f86-b5b4-bddb23577203",
        "createdAt": "2026-06-11T11:28:39.510Z",
        "updatedAt": "2026-06-11T11:43:02.633Z",
        "shopName": "Shop 1",
        "shopImageUrl": "https://res.cloudinary.com/dw1ufbv8u/image/upload/v1781177313/nearvendor/oezrigkbpsn1sjm1nrpp.jpg",
        "whatsappNumber": "+923487474727",
        "shopAddress": "Johar town",
        "isActive": true,
        "shopLongitude": "73.074962",
        "shopLatitude": "33.667806",
        "location": {
          "type": "Point",
          "coordinates": [
            73.075105475,
            33.667782228
          ]
        },
        "shopLogoUrl": "https://res.cloudinary.com/dw1ufbv8u/image/upload/v1781177309/nearvendor/fidordzyu5lbmvkv2ukb.jpg",
        "timezone": "Asia/Karachi",
        "currency": "PKR",
        "categoryId": "d8cc6706-0d0d-44db-b06c-7c77533d2604",
        "registrationNumber": null,
        "shopContactPhone": "+923487474727",
        "storeEmail": null,
        "openingHours": {
          "fri": "09:00-21:00",
          "mon": "09:00-21:00",
          "sat": "09:00-21:00",
          "sun": "closed",
          "thu": "09:00-21:00",
          "tue": "09:00-21:00",
          "wed": "09:00-21:00"
        },
        "lastInventoryUpdate": null,
        "subscriptionAmount": null,
        "vendorProfile": {
          "id": "390dac31-43a5-4150-b09c-24a67d46f956",
          "createdAt": "2026-06-11T11:26:17.194Z",
          "updatedAt": "2026-06-11T11:26:17.194Z",
          "businessName": "bevalo3469@aspensif.com",
          "businessType": "automotive",
          "taxId": "PENDING",
          "cnic": "",
          "cnicImageUrl": "",
          "supportContact": "3487474727",
          "status": "APPROVED",
          "isVerified": true
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

### 6. PUT `/api/admin/shop-categories/{id}/item-categories`
**Assign (replace) item categories for a shop category (SUPERADMIN only)**

**Parameters**:
- `id` (required)

**Request body**:
```json
{
  "categoryIds": [
    "uuid1",
    "uuid2"
  ]
}
```

### 7. DELETE `/api/admin/shop-categories/{id}/item-categories/{categoryId}`
**Remove an item category from a shop category (SUPERADMIN only)**

**Parameters**:
- `id` (required)
- `categoryId` (required)

### 8. GET `/api/admin/item-categories`
**Get all item categories (SUPERADMIN only)**

**Response body**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": [
    {
      "id": "e9e56cca-49a2-4165-b0ad-8bdb07916b0c",
      "createdAt": "2026-05-22T21:14:14.321Z",
      "updatedAt": "2026-05-22T21:14:14.321Z",
      "categoryName": "Automotive items",
      "iconUrl": null,
      "parentId": null,
      "parent": null
    }
  ]
}
```

### 9. POST `/api/admin/item-categories`
**Create an item category (SUPERADMIN only)**

**Request body**:
```json
{
  "categoryName": "Fruits & Vegetables",
  "iconUrl": "https://cdn.example.com/icon.png",
  "parentId": "string"
}
```

**Response Body**:
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Item category created successfully",
  "data": {
    "categoryName": "Fruits & Vegetables",
    "iconUrl": "https://cdn.example.com/icon.png",
    "deletedAt": null,
    "parentId": null,
    "id": "f58a275a-535a-47a7-8e63-5e74c0ce9f69",
    "createdAt": "2026-06-16T13:57:39.703Z",
    "updatedAt": "2026-06-16T13:57:39.703Z"
  }
}
```

### 10. PATCH `/api/admin/item-categories/{id}`
**Update an item category (SUPERADMIN only)**

**Parameters**:
- `id` (required)

**Request Body**:
```json
{
  "categoryName": "Fruits & Vegetables",
  "iconUrl": "https://cdn.example.com/icon.png",
  "parentId": "string"
}
```

### 11. DELETE `/api/admin/item-categories/{id}`
**Delete an item category (SUPERADMIN only)**

**Parameters**:
- `id` (required)
