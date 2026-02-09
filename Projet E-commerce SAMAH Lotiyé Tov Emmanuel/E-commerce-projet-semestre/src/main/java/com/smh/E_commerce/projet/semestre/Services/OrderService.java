package com.smh.E_commerce.projet.semestre.Services;

import com.smh.E_commerce.projet.semestre.Entities.Order;

import java.util.List;

public interface OrderService {
    Order save (Order order);

    Order update(Order order, long id);

    List<Order> findAll();

    void delete(long id);

    Order findById(long id);
    
}
