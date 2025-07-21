# Product Catalog Manager

A modern, full-stack application for managing product catalogs with React frontend and Spring Boot backend. Built with enterprise-grade features including pagination, global search, comprehensive validation, and interactive API documentation.

## 🚀 Features

### Frontend (React 19)
- ✅ **Product Management**: Complete CRUD operations with real-time updates
- ✅ **Advanced Pagination**: Server-side pagination with configurable page sizes (5, 10, 20, 50, 100, 200)
- ✅ **Global Search**: Real-time search across product name, brand, and model with debouncing
- ✅ **Brand Analytics**: Interactive brand summary with search and sorting capabilities
- ✅ **Modern UI/UX**: Material-UI components with responsive design
- ✅ **Error Handling**: Error boundaries, loading states, and user-friendly error messages
- ✅ **Configuration Management**: Environment-based configuration for flexible deployment
- ✅ **Performance Optimized**: Skeleton loading, debounced search, and efficient state management

### Backend (Spring Boot 3.2.6)
- ✅ **RESTful API**: Complete REST API with proper HTTP status codes
- ✅ **Advanced Pagination**: Server-side pagination with search integration
- ✅ **Global Search**: Database-level search across multiple fields
- ✅ **Input Validation**: Comprehensive validation with detailed error messages
- ✅ **Error Handling**: Global exception handling with structured responses
- ✅ **API Documentation**: Interactive Swagger/OpenAPI documentation
- ✅ **Environment Configuration**: Flexible configuration with validation
- ✅ **Structured Logging**: Configurable logging with proper error tracking
- ✅ **Database Integration**: PostgreSQL with Hibernate ORM
- ✅ **CORS Support**: Configurable cross-origin resource sharing

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Material-UI 7** - Professional UI components
- **React Router 7** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Environment Variables** - Configuration management

### Backend
- **Spring Boot 3.2.6** - Modern Java framework
- **Spring Data JPA** - Database abstraction
- **Hibernate** - ORM framework
- **PostgreSQL 15** - Relational database
- **SpringDoc OpenAPI** - API documentation
- **Jakarta Validation** - Input validation
- **Lombok** - Code generation

### DevOps
- **Docker & Docker Compose** - Containerization
- **Maven** - Build tool
- **Environment Configuration** - Flexible deployment

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Java 17+ (for local development)

### Running with Docker (Recommended)

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   cd productcatalogmanager
   ```

2. **Start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8080
   - **API Documentation**: http://localhost:8080/swagger-ui.html
   - **Database**: localhost:5432

### Local Development

#### Backend
```bash
cd backend
mvn spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

## 📚 API Documentation

### Interactive Documentation
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/api-docs

### API Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/products` | List products with pagination | `page`, `size`, `search` |
| GET | `/products/{productKey}` | Get product details | - |
| POST | `/products` | Create new product | - |
| PUT | `/products/{productKey}` | Update product | - |
| DELETE | `/products/{productKey}` | Delete product | - |
| GET | `/products/brand-summary` | Get brand statistics | - |

### Sample API Usage

**List products with pagination:**
```bash
curl "http://localhost:8080/products?page=0&size=10"
```

**Search products globally:**
```bash
curl "http://localhost:8080/products?search=iphone&page=0&size=20"
```

**Create a product:**
```bash
curl -X POST http://localhost:8080/products \
  -H "Content-Type: application/json" \
  -d '{
    "retailer": "Apple Store",
    "brand": "Apple",
    "model": "iPhone 15",
    "productName": "iPhone 15 Pro Max",
    "productDescription": "Latest iPhone with advanced features",
    "price": 1199.99
  }'
```

**Validation Error Example:**
```bash
curl -X POST http://localhost:8080/products \
  -H "Content-Type: application/json" \
  -d '{
    "retailer": "",
    "brand": "Apple",
    "model": "iPhone 15",
    "productName": "",
    "price": -10.00
  }'
```

**Response for validation errors:**
```json
{
  "message": "Validation failed",
  "errors": {
    "retailer": "Retailer is required",
    "productName": "Product name is required",
    "price": "Price must be at least 0.01"
  },
  "status": 400,
  "timestamp": "2024-01-01T12:00:00"
}
```

## ⚙️ Configuration

### Environment Variables

#### Backend Configuration
```properties
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/productcatalog
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres

# Server
SERVER_PORT=8080
LOG_LEVEL=INFO

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:80

# Pagination
DEFAULT_PAGE_SIZE=10
MAX_PAGE_SIZE=200

# Search
MIN_SEARCH_LENGTH=1
MAX_SEARCH_LENGTH=100
```

#### Frontend Configuration
```properties
# API
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_API_TIMEOUT=10000

# Pagination
REACT_APP_DEFAULT_PAGE_SIZE=10
REACT_APP_MAX_PAGE_SIZE=200
REACT_APP_PAGE_SIZE_OPTIONS=5,10,20,50,100,200

# Search
REACT_APP_SEARCH_DEBOUNCE_MS=400
REACT_APP_MIN_SEARCH_LENGTH=1
REACT_APP_MAX_SEARCH_LENGTH=100

# Error Handling
REACT_APP_SHOW_ERROR_DETAILS=false
REACT_APP_ERROR_AUTO_HIDE_MS=5000

# Development
REACT_APP_ENABLE_DEBUG_LOGGING=false
```

## 📁 Project Structure

```
productcatalogmanager/
├── backend/                          # Spring Boot application
│   ├── src/main/java/com/example/productcatalog/
│   │   ├── config/                   # Configuration classes
│   │   │   ├── AppConfig.java        # Application configuration
│   │   │   ├── CorsConfig.java       # CORS configuration
│   │   │   ├── OpenApiConfig.java    # Swagger configuration
│   │   │   └── DataLoader.java       # Data initialization
│   │   ├── controller/               # REST controllers
│   │   │   ├── ProductController.java # Product API endpoints
│   │   │   └── GlobalExceptionHandler.java # Error handling
│   │   ├── entity/                   # JPA entities
│   │   │   └── Product.java          # Product entity with validation
│   │   ├── repository/               # Data repositories
│   │   │   └── ProductRepository.java # Product repository with search
│   │   ├── service/                  # Business logic
│   │   │   └── ProductService.java   # Product business logic
│   │   └── exception/                # Custom exceptions
│   │       └── ProductNotFoundException.java
│   ├── src/main/resources/
│   │   └── application.properties    # Application configuration
│   ├── Dockerfile                    # Backend container
│   └── pom.xml                       # Maven dependencies
├── frontend/                         # React application
│   ├── src/
│   │   ├── components/               # React components
│   │   │   ├── ProductList.js        # Products with pagination & search
│   │   │   ├── ProductDetails.js     # Product detail view
│   │   │   ├── ProductForm.js        # Add/edit product form
│   │   │   ├── BrandSummary.js       # Brand analytics
│   │   │   ├── LoadingSpinner.js     # Reusable loading component
│   │   │   └── ErrorBoundary.js      # Error boundary component
│   │   ├── services/                 # API services
│   │   │   └── apiService.js         # Centralized API service
│   │   ├── config/                   # Configuration
│   │   │   └── config.js             # Environment configuration
│   │   └── App.js                    # Main application component
│   ├── Dockerfile                    # Frontend container
│   └── package.json                  # Node.js dependencies
├── data/
│   └── products.json                 # Sample product data
├── docker-compose.yml                # Multi-container setup
└── README.md                         # This file
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📊 Data Management

### Data Import
The application automatically imports products from `data/products.json` on first startup if the database is empty.

### Database Schema
```sql
CREATE TABLE products (
    product_key BIGSERIAL PRIMARY KEY,
    retailer VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    product_description TEXT,
    price DECIMAL(8,2) NOT NULL CHECK (price >= 0.01)
);
```

## 🔒 Security Features

### Input Validation
- **Backend**: Comprehensive validation using Jakarta Validation
- **Frontend**: Form validation with user feedback
- **Database**: Constraint validation and data integrity

### Error Handling
- **Structured Error Responses**: Consistent error format
- **No Sensitive Data Exposure**: Safe error messages
- **Global Exception Handling**: Centralized error management

### CORS Configuration
- **Configurable Origins**: Environment-based CORS settings
- **Secure Headers**: Proper security headers
- **Development Support**: Local development origins

## 🚀 Performance Features

### Backend Performance
- **Server-side Pagination**: Efficient data loading
- **Database Indexing**: Optimized queries
- **Connection Pooling**: Efficient database connections
- **Structured Logging**: Configurable log levels

### Frontend Performance
- **Debounced Search**: 400ms debounce for search input
- **Skeleton Loading**: Improved perceived performance
- **Efficient State Management**: Optimized React state
- **Code Splitting**: Lazy loading capabilities

## 📈 Monitoring & Observability

### Logging
- **Structured Logging**: JSON format logs
- **Configurable Levels**: Environment-based log levels
- **Error Tracking**: Comprehensive error logging

### Health Checks
- **Application Health**: Spring Boot Actuator ready
- **Database Health**: Connection monitoring
- **API Health**: Endpoint availability

## 🔧 Development Features

### API Documentation
- **Interactive Swagger UI**: Test APIs directly
- **OpenAPI Specification**: Machine-readable API docs
- **Request/Response Examples**: Real examples for all endpoints
- **Error Documentation**: Validation error examples

### Development Tools
- **Hot Reload**: Frontend and backend hot reload
- **Debug Logging**: Configurable debug information
- **Error Boundaries**: Graceful error handling
- **Loading States**: User feedback during operations

## 🚀 Deployment

### Docker Deployment
```bash
# Production deployment
docker-compose -f docker-compose.yml up -d

# Development deployment
docker-compose up --build
```

### Environment Configuration
```bash
# Set environment variables
export SPRING_DATASOURCE_URL=jdbc:postgresql://prod-db:5432/productcatalog
export REACT_APP_API_BASE_URL=https://api.productcatalog.com

# Start application
docker-compose up
```

## 📋 Recent Updates

### ✅ Completed Features
- **Server-side Pagination**: Efficient handling of large datasets
- **Global Search**: Database-level search across multiple fields
- **Input Validation**: Comprehensive validation with detailed messages
- **Error Handling**: Global exception handling with structured responses
- **API Documentation**: Interactive Swagger documentation
- **Environment Configuration**: Flexible configuration management
- **Loading States**: Skeleton loading and user feedback
- **Error Boundaries**: Graceful React error handling
- **Centralized API Service**: Consistent API communication
- **Brand Analytics**: Interactive brand summary with search
- **Responsive Design**: Mobile-friendly interface
- **Performance Optimization**: Debounced search and efficient queries

### 🚧 Roadmap & Future Enhancements

#### 🚀 **Performance & Scalability**
- **Microservices Architecture**: Break down into domain-specific services
- **Database Sharding**: Horizontal scaling for large datasets
- **CDN Integration**: Global content delivery for static assets
- **GraphQL API**: Flexible data fetching and real-time subscriptions
- **Event-Driven Architecture**: Message queues for async processing

#### 🔒 **Security & Compliance**
- **OAuth 2.0 Integration**: Social login and third-party authentication
- **Data Encryption**: End-to-end encryption for sensitive data
- **GDPR Compliance**: Data privacy and user consent management
- **Audit Logging**: Comprehensive activity tracking and compliance
- **Penetration Testing**: Automated security vulnerability scanning

#### 📊 **Business Intelligence & Analytics**
- **Product Performance Dashboard**: Sales trends, inventory analytics
- **Customer Behavior Tracking**: User journey analysis and heatmaps
- **Predictive Analytics**: Demand forecasting and inventory optimization
- **A/B Testing Framework**: Feature experimentation and optimization
- **Business Intelligence Reports**: Executive dashboards and KPI tracking
- **Data Warehouse Integration**: Business intelligence and reporting
- **ETL Pipeline**: Automated data extraction and transformation
- **Data Backup & Recovery**: Automated backup strategies and disaster recovery
- **Data Migration Tools**: Seamless data import/export between systems

#### 🛍️ **E-commerce & Business Features**
- **Stock Level Tracking**: Real-time inventory management
- **Low Stock Alerts**: Automated notifications for reordering
- **Supplier Management**: Vendor relationship and order management
- **Purchase Order System**: Automated procurement workflows
- **Warehouse Management**: Multi-location inventory tracking
- **Wishlist & Favorites**: User preference management
- **Product Reviews & Ratings**: Customer feedback system
- **Recommendation Engine**: AI-powered product suggestions
- **Customer Support Integration**: Live chat and ticket system
- **Loyalty Program**: Points, rewards, and customer retention

#### 🔧 **Developer Experience & DevOps**
- **API Gateway**: Centralized API management and routing
- **Service Mesh**: Inter-service communication and observability
- **Feature Flags**: Gradual feature rollouts and experimentation
- **Blue-Green Deployment**: Zero-downtime deployment strategies
- **Infrastructure as Code**: Terraform/CloudFormation templates
- **Distributed Tracing**: Request flow tracking across services
- **Application Performance Monitoring**: Real-time performance insights
- **Log Aggregation**: Centralized logging with ELK stack
- **Alerting System**: Proactive issue detection and notification
- **Health Check Dashboard**: System status and dependency monitoring

#### 🌐 **Integration & Connectivity**
- **Payment Gateway Integration**: Stripe, PayPal, etc.
- **Shipping Provider APIs**: FedEx, UPS, DHL integration
- **ERP System Integration**: SAP, Oracle, Microsoft Dynamics
- **CRM Integration**: Salesforce, HubSpot connectivity
- **Accounting Software**: QuickBooks, Xero integration
- **Webhook System**: Real-time event notifications
- **API Rate Limiting**: Usage-based throttling and quotas
- **API Documentation**: Interactive developer portal
- **SDK Development**: Client libraries for multiple languages
- **API Marketplace**: Third-party developer ecosystem

#### 📱 **User Experience & Interface**
- **Progressive Web App**: Offline functionality and app-like experience
- **Voice Search**: AI-powered voice-enabled product search
- **Augmented Reality**: AR product visualization and try-on
- **Multi-language Support**: Internationalization and localization
- **Accessibility Compliance**: WCAG 2.1 AA standards implementation
- **User Preferences**: Customizable dashboard and settings
- **Personalized Recommendations**: Machine learning-based suggestions
- **Custom Branding**: White-label solutions for different clients
- **Role-Based Dashboards**: Tailored interfaces for different user types

#### 🔮 **Emerging Technologies**
- **Chatbot Integration**: AI-powered customer support
- **Image Recognition**: Automatic product categorization
- **Natural Language Processing**: Advanced search and filtering
- **Predictive Maintenance**: System health monitoring
- **Automated Testing**: AI-driven test case generation

#### 🏢 **Enterprise Features**
- **SaaS Platform**: Multi-tenant architecture for scalability
- **Custom Domain Support**: White-label domain management
- **Tenant Isolation**: Secure data separation between clients
- **Billing & Subscription**: Usage-based pricing and billing
- **Data Governance**: Data quality and lifecycle management
- **Compliance Reporting**: Automated regulatory reporting
- **Data Retention Policies**: Automated data archival and deletion
- **Access Control**: Fine-grained permissions and role management

#### 📋 **Near-Term Roadmap (Next 3-6 Months)**
- **Authentication & Authorization**: User management system with role-based access
- **Advanced Caching**: Redis-based caching layer for improved performance
- **Comprehensive Testing**: Unit, integration, and E2E test coverage expansion
- **Performance Monitoring**: Application metrics and monitoring dashboard
- **Real-time Updates**: WebSocket integration for live data synchronization
- **Advanced Analytics**: Product performance metrics and business intelligence
- **Bulk Operations**: Mass import/export functionality for data management
- **API Versioning**: Backward compatibility support for API evolution
- **Rate Limiting**: API usage protection and throttling mechanisms
- **Product Photo Management**: Upload, manage, edit, and delete product photos with image optimization
- **Mobile Application**: Native mobile app for iOS and Android platforms

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and patterns
- Add comprehensive tests for new features
- Update documentation for API changes
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

#### Port Conflicts
```bash
# Check if ports are in use
netstat -tulpn | grep :3000
netstat -tulpn | grep :8080
netstat -tulpn | grep :5432
```

#### Database Connection Issues
```bash
# Check database container
docker-compose logs db

# Restart database
docker-compose restart db
```

#### Frontend Build Issues
```bash
# Clear node modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### Backend Build Issues
```bash
# Clean and rebuild
cd backend
mvn clean install
```

### Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db

# Follow logs in real-time
docker-compose logs -f backend
```

## 📞 Support

For support and questions:
- **Documentation**: Check the API documentation at http://localhost:8080/swagger-ui.html
- **Issues**: Create an issue in the repository
- **Email**: linh@alumni.harvard.edu

---

**Built with ❤️ by EnterBridge Team** 
