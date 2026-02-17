package com.smh.Backend_E_commerce.Services;

import com.smh.Backend_E_commerce.entities.Order;

import java.util.List;

public interface OrderService {
    Order save (Order order);

    Order update(Order order, long id);

    List<Order> findAll();

    void delete(long id);

    Order findById(long id);
    
}
