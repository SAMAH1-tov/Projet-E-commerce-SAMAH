package com.smh.Backend_E_commerce.ServiceImp;



import com.smh.Backend_E_commerce.Repositories.SubCategoryRepository;
import com.smh.Backend_E_commerce.Services.SubCategoryService;
import com.smh.Backend_E_commerce.entities.SubCategory;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SubCategoryServiceImp implements SubCategoryService {

    private final SubCategoryRepository subCategoryRepository;

    public SubCategoryServiceImp(SubCategoryRepository subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }


    @Override
    public SubCategory save(SubCategory subCategory) {
        return this.subCategoryRepository.save(subCategory);
    }

    @Override
    public SubCategory update(SubCategory subCategory, long id) {
        SubCategory subCategoryFind = subCategoryRepository.findById(id).orElse(null);
        subCategoryFind.setId(subCategory.getId());
        subCategoryFind.setName(subCategory.getName());
        subCategoryFind.setDescription(subCategory.getDescription());
        subCategoryFind.setCategory(subCategory.getCategory());
        subCategoryFind.setProducts(subCategory.getProducts());
        SubCategory update = subCategoryRepository.save(subCategoryFind);
        return update;
    }

    @Override
    public List<SubCategory> findAll() {
        return subCategoryRepository.findAll();
    }

    @Override
    public void delete(long id) {
        SubCategory subCategoryFind = subCategoryRepository.findById(id).orElse(null);
        subCategoryRepository.deleteById(subCategoryFind.getId());

    }

    @Override
    public SubCategory findById(long id) {
        SubCategory subCategoryFind = subCategoryRepository.findById(id).orElse(null);
        return subCategoryFind;
    }
}
