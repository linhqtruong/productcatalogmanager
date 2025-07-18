package com.example.productcatalog.service;

import com.example.productcatalog.entity.Product;
import com.example.productcatalog.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.Collections;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {
    @Test
    void getAllProducts_returnsList() {
        ProductRepository repo = mock(ProductRepository.class);
        ProductService service = new ProductService(repo);
        when(repo.findAll()).thenReturn(Collections.singletonList(new Product()));
        List<Product> products = service.getAllProducts();
        assertEquals(1, products.size());
    }
} 