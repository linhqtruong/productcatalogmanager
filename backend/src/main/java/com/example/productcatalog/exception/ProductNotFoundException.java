package com.example.productcatalog.exception;

public class ProductNotFoundException extends RuntimeException {
    
    public ProductNotFoundException(String message) {
        super(message);
    }
    
    public ProductNotFoundException(Long productKey) {
        super("Product not found with key: " + productKey);
    }
} 