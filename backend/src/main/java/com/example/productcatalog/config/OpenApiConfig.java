package com.example.productcatalog.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Product Catalog Manager API")
                        .description("""
                                A comprehensive REST API for managing product catalogs.
                                
                                ## Features
                                - **Product Management**: CRUD operations for products
                                - **Pagination**: Server-side pagination with configurable page sizes
                                - **Global Search**: Search across product name, brand, and model
                                - **Brand Summary**: Get aggregated brand statistics
                                - **Input Validation**: Comprehensive validation with detailed error messages
                                
                                ## Authentication
                                Currently, this API does not require authentication for development purposes.
                                
                                ## Rate Limiting
                                No rate limiting is currently implemented.
                                """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("EnterBridge")
                                .url("https://enterbridge.com")
                                .email("info@enterbridge.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Development server"),
                        new Server()
                                .url("https://api.productcatalog.com")
                                .description("Production server")
                ))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("JWT token for authentication (not implemented yet)")));
    }
} 