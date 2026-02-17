package com.smh.Backend_E_commerce.Controllers;



import com.smh.Backend_E_commerce.Services.ProductService;
import com.smh.Backend_E_commerce.entities.Product;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/products/")

public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("save")
    public ResponseEntity<Product> create(@RequestBody Product product) {
        Product saved = productService.save(product);
        System.out.println("Product");
        System.out.println(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("findAll")
    public List<Product> list() {
        return productService.findAll();
    }


    @PutMapping("update/{id}")
    public  ResponseEntity<Product> update(@PathVariable ("id") long id,
                                         @RequestBody Product product)
    {
        Product update = productService.update(product,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(update);

    }
    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable ("id") long id){
        productService.delete(id);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity getById(@PathVariable ("id") long id){
        Product productFind = productService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(productFind);
    }
}
