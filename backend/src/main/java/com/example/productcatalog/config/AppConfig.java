package com.example.productcatalog.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "app")
@Data
@Validated
public class AppConfig {
    
    private Pagination pagination = new Pagination();
    private Search search = new Search();
    
    @Data
    public static class Pagination {
        @Min(value = 1, message = "Default page size must be at least 1")
        @Max(value = 1000, message = "Default page size cannot exceed 1000")
        private int defaultSize = 10;
        
        @Min(value = 1, message = "Max page size must be at least 1")
        @Max(value = 1000, message = "Max page size cannot exceed 1000")
        private int maxSize = 200;
    }
    
    @Data
    public static class Search {
        @Min(value = 1, message = "Min search length must be at least 1")
        private int minLength = 1;
        
        @Min(value = 1, message = "Max search length must be at least 1")
        @Max(value = 500, message = "Max search length cannot exceed 500")
        private int maxLength = 100;
    }
} 