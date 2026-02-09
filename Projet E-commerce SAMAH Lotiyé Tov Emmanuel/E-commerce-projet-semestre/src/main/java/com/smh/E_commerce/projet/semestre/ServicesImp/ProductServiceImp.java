package com.smh.E_commerce.projet.semestre.ServicesImp;


import com.smh.E_commerce.projet.semestre.Entities.Product;
import com.smh.E_commerce.projet.semestre.Repositories.ProductRepository;
import com.smh.E_commerce.projet.semestre.Services.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductServiceImp implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImp(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @Override
    public Product save(Product product) {
        return this.productRepository.save(product);
    }

    @Override
    public Product update(Product product, long id) {
        Product productFind = productRepository.findById(id).orElse(null);
        productFind.setId(product.getId());
        productFind.setRef(product.getRef());
        productFind.setDescription(product.getDescription());
        productFind.setSubcategory(product.getSubcategory());
        productFind.setQuantity(product.getQuantity());
        productFind.setGallery(product.getGallery());
        productFind.setProvider(product.getProvider());
        productFind.setOrder(product.getOrder());
        Product update = productRepository.save(productFind);
        return update;
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public void delete(long id) {
        Product productFind = productRepository.findById(id).orElse(null);
        productRepository.deleteById(productFind.getId());

    }

    @Override
    public Product findById(long id) {
        Product productFind = productRepository.findById(id).orElse(null);
        return productFind;
    }
}
