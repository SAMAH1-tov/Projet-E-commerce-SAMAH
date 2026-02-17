package com.smh.Backend_E_commerce.Controllers;


import com.smh.Backend_E_commerce.Services.SubCategoryService;
import com.smh.Backend_E_commerce.entities.SubCategory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/subcategories/")

public class SubCategoryController {
    private final SubCategoryService subCategoryService;

    public SubCategoryController(SubCategoryService subCategoryService) {
        this.subCategoryService = subCategoryService;
    }

    @PostMapping("save")
    public ResponseEntity<SubCategory> create(@RequestBody SubCategory subCategory) {
        SubCategory saved = subCategoryService.save(subCategory);
        System.out.println("SubCategory");
        System.out.println(subCategory);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("findAll")
    public List<SubCategory> list() {
        return subCategoryService.findAll();
    }


    @PutMapping("update/{id}")
    public  ResponseEntity<SubCategory> update(@PathVariable ("id") long id,
                                         @RequestBody SubCategory subCategory)
    {
        SubCategory update = subCategoryService.update(subCategory,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(update);

    }
    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable ("id") long id){
        subCategoryService.delete(id);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity getById(@PathVariable ("id") long id){
        SubCategory subCategoryFind = subCategoryService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(subCategoryFind);
    }
}
