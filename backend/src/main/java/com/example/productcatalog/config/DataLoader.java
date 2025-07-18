package com.example.productcatalog.config;

import com.example.productcatalog.entity.Product;
import com.example.productcatalog.repository.ProductRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {
    private final ProductRepository productRepository;

    @Autowired
    public DataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            loadProductsFromJson();
        }
    }

    private void loadProductsFromJson() {
        try {
            File file = new File("/data/products.json");
            if (!file.exists()) {
                System.out.println("products.json not found at /data/products.json");
                return;
            }
            ObjectMapper mapper = new ObjectMapper();
            List<Product> products = mapper.readValue(file, new TypeReference<List<Product>>() {});
            // Ensure price is BigDecimal
            for (Product p : products) {
                if (p.getPrice() != null) {
                    p.setPrice(new BigDecimal(p.getPrice().toString()));
                }
            }
            productRepository.saveAll(products);
            System.out.println("Loaded products from products.json");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
} 