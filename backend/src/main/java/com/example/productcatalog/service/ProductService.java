package com.example.productcatalog.service;

import com.example.productcatalog.entity.Product;
import com.example.productcatalog.exception.ProductNotFoundException;
import com.example.productcatalog.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Page<Product> getAllProducts(Pageable pageable, String search) {
        if (search != null && !search.trim().isEmpty()) {
            return productRepository.searchProducts(search.trim(), pageable);
        } else {
            return productRepository.findAll(pageable);
        }
    }

    public Optional<Product> getProductById(Long productKey) {
        return productRepository.findById(productKey);
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long productKey) {
        if (!productRepository.existsById(productKey)) {
            throw new ProductNotFoundException(productKey);
        }
        productRepository.deleteById(productKey);
    }

    public List<ProductRepository.BrandSummary> getBrandSummary() {
        return productRepository.findBrandSummary();
    }

    public Product updateProduct(Long productKey, Product updatedProduct) {
        return productRepository.findById(productKey)
                .map(product -> {
                    product.setRetailer(updatedProduct.getRetailer());
                    product.setBrand(updatedProduct.getBrand());
                    product.setModel(updatedProduct.getModel());
                    product.setProductName(updatedProduct.getProductName());
                    product.setProductDescription(updatedProduct.getProductDescription());
                    product.setPrice(updatedProduct.getPrice());
                    return productRepository.save(product);
                })
                .orElseThrow(() -> new ProductNotFoundException(productKey));
    }
} 