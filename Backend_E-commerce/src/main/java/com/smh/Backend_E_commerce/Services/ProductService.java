package com.smh.Backend_E_commerce.Services;

import com.smh.Backend_E_commerce.entities.Product;

import java.util.List;

public interface ProductService {
    Product save (Product product);

    Product update(Product product, long id);

    List<Product> findAll();

    void delete(long id);

    Product findById(long id);
    
}
