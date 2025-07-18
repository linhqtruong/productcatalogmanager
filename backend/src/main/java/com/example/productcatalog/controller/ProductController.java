package com.example.productcatalog.controller;

import com.example.productcatalog.entity.Product;
import com.example.productcatalog.repository.ProductRepository;
import com.example.productcatalog.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;

@RestController
@RequestMapping("/products")
@Tag(name = "Product Management", description = "APIs for managing products in the catalog")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    @Operation(
        summary = "Get all products with pagination",
        description = "Retrieve a paginated list of products with optional search functionality. " +
                     "Supports searching across product name, brand, and model fields."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved products",
            content = @Content(schema = @Schema(implementation = Page.class))),
        @ApiResponse(responseCode = "400", description = "Invalid pagination parameters"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public Page<Product> getAllProducts(
            @Parameter(description = "Pagination parameters (page, size, sort)")
            @PageableDefault(size = 10) Pageable pageable,
            
            @Parameter(description = "Search term to filter products by name, brand, or model")
            @RequestParam(value = "search", required = false) String search) {
        return productService.getAllProducts(pageable, search);
    }

    @PostMapping
    @Operation(
        summary = "Create a new product",
        description = "Add a new product to the catalog with validation"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Product created successfully",
            content = @Content(schema = @Schema(implementation = Product.class))),
        @ApiResponse(responseCode = "400", description = "Validation failed",
            content = @Content(examples = {
                @ExampleObject(name = "Validation Error", value = """
                    {
                      "message": "Validation failed",
                      "errors": {
                        "productName": "Product name is required",
                        "price": "Price must be at least 0.01"
                      },
                      "status": 400,
                      "timestamp": "2024-01-01T12:00:00"
                    }
                    """)
            })),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Product> addProduct(
            @Parameter(description = "Product data to create", required = true)
            @Valid @RequestBody Product product) {
        Product savedProduct = productService.addProduct(product);
        return ResponseEntity.status(201).body(savedProduct);
    }

    @GetMapping("/{productKey}")
    @Operation(
        summary = "Get product by ID",
        description = "Retrieve a specific product by its unique identifier"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product found",
            content = @Content(schema = @Schema(implementation = Product.class))),
        @ApiResponse(responseCode = "404", description = "Product not found"),
        @ApiResponse(responseCode = "400", description = "Invalid product key format"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Product> getProductById(
            @Parameter(description = "Unique identifier of the product", required = true)
            @PathVariable @Positive Long productKey) {
        return productService.getProductById(productKey)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{productKey}")
    @Operation(
        summary = "Update an existing product",
        description = "Update a product's information by its unique identifier"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product updated successfully",
            content = @Content(schema = @Schema(implementation = Product.class))),
        @ApiResponse(responseCode = "404", description = "Product not found"),
        @ApiResponse(responseCode = "400", description = "Validation failed or invalid product key"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Product> updateProduct(
            @Parameter(description = "Unique identifier of the product to update", required = true)
            @PathVariable @Positive Long productKey,
            
            @Parameter(description = "Updated product data", required = true)
            @Valid @RequestBody Product product) {
        try {
            Product updatedProduct = productService.updateProduct(productKey, product);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{productKey}")
    @Operation(
        summary = "Delete a product",
        description = "Remove a product from the catalog by its unique identifier"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Product deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Product not found"),
        @ApiResponse(responseCode = "400", description = "Invalid product key format"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Void> deleteProduct(
            @Parameter(description = "Unique identifier of the product to delete", required = true)
            @PathVariable @Positive Long productKey) {
        try {
            productService.deleteProduct(productKey);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/brand-summary")
    @Operation(
        summary = "Get brand summary statistics",
        description = "Retrieve aggregated statistics showing product counts by brand"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Brand summary retrieved successfully",
            content = @Content(schema = @Schema(implementation = ProductRepository.BrandSummary.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<ProductRepository.BrandSummary>> getBrandSummary() {
        List<ProductRepository.BrandSummary> brandSummary = productService.getBrandSummary();
        return ResponseEntity.ok(brandSummary);
    }
} 