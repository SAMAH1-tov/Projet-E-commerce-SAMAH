package com.smh.Backend_E_commerce.Controllers;

import com.smh.Backend_E_commerce.Services.CategoryService;
import com.smh.Backend_E_commerce.entities.Category;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/categories/")

public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("save")
    public ResponseEntity<Category> create(@RequestBody Category category) {
        Category saved = categoryService.save(category);
        System.out.println("Category");
        System.out.println(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("findAll")
    public List<Category> list() {
        return categoryService.findAll();
    }


    @PutMapping("update/{id}")
    public  ResponseEntity<Category> update(@PathVariable ("id") long id,
                                         @RequestBody Category category)
    {
        Category update = categoryService.update(category,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(update);

    }
    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable ("id") long id){
        categoryService.delete(id);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity getById(@PathVariable ("id") long id){
        Category categoryFind = categoryService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(categoryFind);
    }
}
