# Product Catalog Manager - UML Diagrams

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Product Catalog Manager                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    HTTP/REST    ┌─────────────────┐                   │
│  │   React Frontend │ ◄─────────────► │ Spring Boot API │                   │
│  │   (Port 3000)   │                 │   (Port 8080)   │                   │
│  └─────────────────┘                 └─────────────────┘                   │
│           │                                     │                          │
│           │                                     │                          │
│           ▼                                     ▼                          │
│  ┌─────────────────┐                 ┌─────────────────┐                   │
│  │   PostgreSQL    │                 │   PostgreSQL    │                   │
│  │   (Port 5432)   │                 │   (Port 5432)   │                   │
│  └─────────────────┘                 └─────────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 📊 Class Diagram - Backend (Spring Boot)

```mermaid
classDiagram
    class ProductCatalogApplication {
        +main(String[] args) void
    }

    class Product {
        -Long productKey
        -String retailer
        -String brand
        -String model
        -String productName
        -String productDescription
        -BigDecimal price
        +getProductKey() Long
        +setProductKey(Long) void
        +getRetailer() String
        +setRetailer(String) void
        +getBrand() String
        +setBrand(String) void
        +getModel() String
        +setModel(String) void
        +getProductName() String
        +setProductName(String) void
        +getProductDescription() String
        +setProductDescription(String) void
        +getPrice() BigDecimal
        +setPrice(BigDecimal) void
    }

    class ProductController {
        -ProductService productService
        +ProductController(ProductService)
        +getAllProducts(Pageable, String) Page~Product~
        +addProduct(Product) ResponseEntity~Product~
        +getProductById(Long) ResponseEntity~Product~
        +updateProduct(Long, Product) ResponseEntity~Product~
        +deleteProduct(Long) ResponseEntity~Void~
        +getBrandSummary() ResponseEntity~List~BrandSummary~~
    }

    class ProductService {
        -ProductRepository productRepository
        +ProductService(ProductRepository)
        +getAllProducts() List~Product~
        +getAllProducts(Pageable, String) Page~Product~
        +getProductById(Long) Optional~Product~
        +addProduct(Product) Product
        +deleteProduct(Long) void
        +updateProduct(Long, Product) Product
        +getBrandSummary() List~BrandSummary~
    }

    class ProductRepository {
        <<interface>>
        +findAll() List~Product~
        +findAll(Pageable) Page~Product~
        +findById(Long) Optional~Product~
        +save(Product) Product
        +deleteById(Long) void
        +existsById(Long) boolean
        +searchProducts(String, Pageable) Page~Product~
        +findBrandSummary() List~BrandSummary~
    }

    class BrandSummary {
        <<interface>>
        +getBrand() String
        +getCount() Long
    }

    class ProductNotFoundException {
        -Long productKey
        +ProductNotFoundException(Long)
        +getProductKey() Long
    }

    class GlobalExceptionHandler {
        +handleValidationException(MethodArgumentNotValidException) ResponseEntity~ErrorResponse~
        +handleProductNotFoundException(ProductNotFoundException) ResponseEntity~ErrorResponse~
        +handleGenericException(Exception) ResponseEntity~ErrorResponse~
    }

    class ErrorResponse {
        -String message
        -Map~String, String~ errors
        -int status
        -String timestamp
        +getMessage() String
        +setMessage(String) void
        +getErrors() Map~String, String~
        +setErrors(Map~String, String~) void
        +getStatus() int
        +setStatus(int) void
        +getTimestamp() String
        +setTimestamp(String) void
    }

    class CorsConfig {
        +corsConfigurationSource() CorsConfigurationSource
    }

    class OpenApiConfig {
        +customOpenAPI() OpenAPI
    }

    class DataLoader {
        -ProductRepository productRepository
        +DataLoader(ProductRepository)
        +loadData() void
    }

    %% Relationships
    ProductCatalogApplication --> ProductController
    ProductController --> ProductService
    ProductService --> ProductRepository
    ProductService --> ProductNotFoundException
    ProductRepository --> Product
    ProductRepository --> BrandSummary
    GlobalExceptionHandler --> ErrorResponse
    GlobalExceptionHandler --> ProductNotFoundException
    DataLoader --> ProductRepository
    DataLoader --> Product
```

## 🎨 Class Diagram - Frontend (React)

```mermaid
classDiagram
    class App {
        -ThemeProvider theme
        -Router router
        +App()
        +render() JSX
    }

    class NavigationTabs {
        -useNavigate navigate
        -useLocation location
        +NavigationTabs()
        +getCurrentTab() number
        +handleTabChange(event, newValue) void
        +render() JSX
    }

    class ProductList {
        -useState products
        -useState searchTerm
        -useState loading
        -useState error
        -useState page
        -useState pageSize
        -useState totalPages
        -useRef searchTimeout
        +ProductList()
        +fetchProducts(customPage, customPageSize, customSearch) Promise
        +handleDelete(product) void
        +confirmDelete() Promise
        +handleSort(field) void
        +getFieldValue(product, field) any
        +showSnackbar(message, severity) void
        +render() JSX
    }

    class ProductDetails {
        -useState product
        -useState loading
        -useState error
        -useParams params
        +ProductDetails()
        +fetchProduct(id) Promise
        +render() JSX
    }

    class ProductForm {
        -useState formData
        -useState loading
        -useState error
        -useParams params
        -useNavigate navigate
        +ProductForm()
        +fetchProduct(id) Promise
        +handleSubmit(event) Promise
        +handleChange(event) void
        +validateForm() boolean
        +render() JSX
    }

    class BrandSummary {
        -useState brandData
        -useState loading
        -useState error
        -useState searchTerm
        +BrandSummary()
        +fetchBrandSummary() Promise
        +handleSearch(event) void
        +render() JSX
    }

    class ErrorBoundary {
        -state hasError
        -state error
        +ErrorBoundary()
        +static getDerivedStateFromError(error) object
        +componentDidCatch(error, errorInfo) void
        +render() JSX
    }

    class LoadingSpinner {
        -props type
        -props size
        -props message
        +LoadingSpinner(props)
        +render() JSX
    }

    class ApiService {
        -axios instance
        -config
        +getProducts(params) Promise
        +getProduct(id) Promise
        +createProduct(product) Promise
        +updateProduct(id, product) Promise
        +deleteProduct(id) Promise
        +getBrandSummary() Promise
        +handleApiError(error, defaultMessage) object
    }

    class Config {
        -API_BASE_URL
        -API_TIMEOUT
        -DEFAULT_PAGE_SIZE
        -MAX_PAGE_SIZE
        -PAGE_SIZE_OPTIONS
        -SEARCH_DEBOUNCE_MS
        -MIN_SEARCH_LENGTH
        -MAX_SEARCH_LENGTH
        -SHOW_ERROR_DETAILS
        -ERROR_AUTO_HIDE_MS
        -ENABLE_DEBUG_LOGGING
        +get API_BASE_URL() string
        +get API_TIMEOUT() number
        +get DEFAULT_PAGE_SIZE() number
        +get MAX_PAGE_SIZE() number
        +get PAGE_SIZE_OPTIONS() array
        +get SEARCH_DEBOUNCE_MS() number
        +get MIN_SEARCH_LENGTH() number
        +get MAX_SEARCH_LENGTH() number
        +get SHOW_ERROR_DETAILS() boolean
        +get ERROR_AUTO_HIDE_MS() number
        +get ENABLE_DEBUG_LOGGING() boolean
    }

    %% Relationships
    App --> NavigationTabs
    App --> ProductList
    App --> ProductDetails
    App --> ProductForm
    App --> BrandSummary
    App --> ErrorBoundary
    ProductList --> LoadingSpinner
    ProductList --> ApiService
    ProductDetails --> ApiService
    ProductForm --> ApiService
    BrandSummary --> ApiService
    ApiService --> Config
```

## 🔄 Sequence Diagram - Product CRUD Operations

### Create Product
```mermaid
sequenceDiagram
    participant U as User
    participant PL as ProductList
    participant PF as ProductForm
    participant AS as ApiService
    participant PC as ProductController
    participant PS as ProductService
    participant PR as ProductRepository
    participant DB as Database

    U->>PL: Click "Add Product"
    PL->>PF: Navigate to /add
    U->>PF: Fill form & submit
    PF->>AS: createProduct(productData)
    AS->>PC: POST /products
    PC->>PS: addProduct(product)
    PS->>PR: save(product)
    PR->>DB: INSERT INTO products
    DB-->>PR: Saved product
    PR-->>PS: Product object
    PS-->>PC: Product object
    PC-->>AS: 201 Created + Product
    AS-->>PF: Success response
    PF->>PL: Navigate back to list
    PL->>AS: getProducts()
    AS->>PC: GET /products
    PC->>PS: getAllProducts()
    PS->>PR: findAll()
    PR->>DB: SELECT * FROM products
    DB-->>PR: Product list
    PR-->>PS: Product list
    PS-->>PC: Product list
    PC-->>AS: 200 OK + Products
    AS-->>PL: Updated product list
    PL-->>U: Display updated list
```

### Read Products with Pagination & Search
```mermaid
sequenceDiagram
    participant U as User
    participant PL as ProductList
    participant AS as ApiService
    participant PC as ProductController
    participant PS as ProductService
    participant PR as ProductRepository
    participant DB as Database

    U->>PL: Enter search term
    PL->>PL: Debounce search (400ms)
    PL->>AS: getProducts({page: 0, size: 10, search: "iphone"})
    AS->>PC: GET /products?page=0&size=10&search=iphone
    PC->>PS: getAllProducts(pageable, search)
    PS->>PR: searchProducts(search, pageable)
    PR->>DB: SELECT * FROM products WHERE LOWER(product_name) LIKE '%iphone%' OR LOWER(brand) LIKE '%iphone%' OR LOWER(model) LIKE '%iphone%' LIMIT 10 OFFSET 0
    DB-->>PR: Paginated results
    PR-->>PS: Page<Product>
    PS-->>PC: Page<Product>
    PC-->>AS: 200 OK + Paginated results
    AS-->>PL: Search results
    PL-->>U: Display filtered products
```

### Update Product
```mermaid
sequenceDiagram
    participant U as User
    participant PL as ProductList
    participant PD as ProductDetails
    participant PF as ProductForm
    participant AS as ApiService
    participant PC as ProductController
    participant PS as ProductService
    participant PR as ProductRepository
    participant DB as Database

    U->>PL: Click "Edit" button
    PL->>PF: Navigate to /edit/:id
    PF->>AS: getProduct(id)
    AS->>PC: GET /products/:id
    PC->>PS: getProductById(id)
    PS->>PR: findById(id)
    PR->>DB: SELECT * FROM products WHERE product_key = ?
    DB-->>PR: Product data
    PR-->>PS: Optional<Product>
    PS-->>PC: Optional<Product>
    PC-->>AS: 200 OK + Product
    AS-->>PF: Product data
    PF-->>U: Display form with current data
    U->>PF: Modify data & submit
    PF->>AS: updateProduct(id, updatedData)
    AS->>PC: PUT /products/:id
    PC->>PS: updateProduct(id, product)
    PS->>PR: findById(id)
    PR->>DB: SELECT * FROM products WHERE product_key = ?
    DB-->>PR: Existing product
    PS->>PR: save(updatedProduct)
    PR->>DB: UPDATE products SET ... WHERE product_key = ?
    DB-->>PR: Updated product
    PR-->>PS: Updated product
    PS-->>PC: Updated product
    PC-->>AS: 200 OK + Updated product
    AS-->>PF: Success response
    PF->>PL: Navigate back to list
    PL-->>U: Display updated list
```

### Delete Product
```mermaid
sequenceDiagram
    participant U as User
    participant PL as ProductList
    participant AS as ApiService
    participant PC as ProductController
    participant PS as ProductService
    participant PR as ProductRepository
    participant DB as Database

    U->>PL: Click "Delete" button
    PL->>PL: Show confirmation dialog
    U->>PL: Confirm deletion
    PL->>AS: deleteProduct(id)
    AS->>PC: DELETE /products/:id
    PC->>PS: deleteProduct(id)
    PS->>PR: existsById(id)
    PR->>DB: SELECT COUNT(*) FROM products WHERE product_key = ?
    DB-->>PR: Count result
    PR-->>PS: true (exists)
    PS->>PR: deleteById(id)
    PR->>DB: DELETE FROM products WHERE product_key = ?
    DB-->>PR: Deletion successful
    PR-->>PS: void
    PS-->>PC: void
    PC-->>AS: 204 No Content
    AS-->>PL: Success response
    PL->>PL: Remove from local state
    PL-->>U: Display updated list
```

## 🏛️ Component Diagram - System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer (React)"
        A[App.js] --> B[ProductList.js]
        A --> C[ProductDetails.js]
        A --> D[ProductForm.js]
        A --> E[BrandSummary.js]
        A --> F[ErrorBoundary.js]
        A --> G[LoadingSpinner.js]
        B --> H[ApiService.js]
        C --> H
        D --> H
        E --> H
        H --> I[Config.js]
    end

    subgraph "Backend Layer (Spring Boot)"
        J[ProductController.java] --> K[ProductService.java]
        K --> L[ProductRepository.java]
        K --> M[ProductNotFoundException.java]
        N[GlobalExceptionHandler.java] --> O[ErrorResponse.java]
        P[CorsConfig.java]
        Q[OpenApiConfig.java]
        R[DataLoader.java] --> L
    end

    subgraph "Data Layer"
        L --> S[(PostgreSQL Database)]
        T[products.json] --> R
    end

    subgraph "External Dependencies"
        U[Material-UI Components]
        V[React Router]
        W[Axios HTTP Client]
        X[Spring Data JPA]
        Y[Hibernate ORM]
        Z[Swagger/OpenAPI]
    end

    B --> U
    C --> U
    D --> U
    E --> U
    A --> V
    H --> W
    L --> X
    X --> Y
    J --> Z
```

## 📋 Database Schema Diagram

```mermaid
erDiagram
    PRODUCTS {
        bigint product_key PK
        varchar retailer "NOT NULL"
        varchar brand "NOT NULL"
        varchar model "NOT NULL"
        varchar product_name "NOT NULL"
        text product_description
        decimal price "NOT NULL"
    }

    PRODUCTS ||--o{ BRAND_SUMMARY : "aggregates"
    
    BRAND_SUMMARY {
        varchar brand
        bigint count
    }
```

## 🔐 Security & Validation Flow

```mermaid
flowchart TD
    A[Client Request] --> B{Valid Format?}
    B -->|No| C[400 Bad Request]
    B -->|Yes| D[Controller Layer]
    D --> E{@Valid Annotation?}
    E -->|No| F[Service Layer]
    E -->|Yes| G[Validation Layer]
    G --> H{Validation Pass?}
    H -->|No| I[GlobalExceptionHandler]
    I --> J[ErrorResponse]
    J --> K[400 Bad Request + Details]
    H -->|Yes| F
    F --> L{Business Logic Valid?}
    L -->|No| M[Custom Exception]
    M --> I
    L -->|Yes| N[Repository Layer]
    N --> O[Database]
    O --> P[Success Response]
```

## 📊 API Endpoints Summary

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/products` | List products with pagination | - | `Page<Product>` |
| GET | `/products/{id}` | Get product by ID | - | `Product` |
| POST | `/products` | Create new product | `Product` | `Product` (201) |
| PUT | `/products/{id}` | Update product | `Product` | `Product` |
| DELETE | `/products/{id}` | Delete product | - | `204 No Content` |
| GET | `/products/brand-summary` | Get brand statistics | - | `List<BrandSummary>` |

## 🎯 Key Design Patterns Used

1. **MVC Pattern**: Separation of concerns between Model, View, and Controller
2. **Repository Pattern**: Data access abstraction layer
3. **Service Layer Pattern**: Business logic encapsulation
4. **DTO Pattern**: Data transfer objects for API communication
5. **Exception Handler Pattern**: Centralized error handling
6. **Configuration Pattern**: Environment-based configuration management
7. **Component Pattern**: Reusable React components
8. **Hooks Pattern**: React functional components with state management

## 🔧 Configuration Management

```mermaid
graph LR
    A[Environment Variables] --> B[Backend Config]
    A --> C[Frontend Config]
    B --> D[application.properties]
    C --> E[config.js]
    D --> F[Spring Boot App]
    E --> G[React App]
```

This UML documentation provides a comprehensive view of the Product Catalog Manager's architecture, showing the relationships between components, data flow, and system design patterns. 