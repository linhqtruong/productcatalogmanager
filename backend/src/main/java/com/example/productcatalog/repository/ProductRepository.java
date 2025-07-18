package com.example.productcatalog.repository;

import com.example.productcatalog.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p.brand AS brand, COUNT(p) AS count FROM Product p GROUP BY p.brand")
    List<BrandSummary> findBrandSummary();

    @Query("SELECT p FROM Product p WHERE LOWER(p.productName) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.model) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Product> searchProducts(String search, Pageable pageable);

    interface BrandSummary {
        String getBrand();
        Long getCount();
    }
} 