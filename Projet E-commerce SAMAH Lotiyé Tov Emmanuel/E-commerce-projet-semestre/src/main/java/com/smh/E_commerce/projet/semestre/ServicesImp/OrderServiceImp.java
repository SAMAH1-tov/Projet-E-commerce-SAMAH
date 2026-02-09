package com.smh.E_commerce.projet.semestre.ServicesImp;


import com.smh.E_commerce.projet.semestre.Entities.Order;
import com.smh.E_commerce.projet.semestre.Repositories.OrderRepository;
import com.smh.E_commerce.projet.semestre.Services.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class OrderServiceImp implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImp(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    @Override
    public Order save(Order order) {
        return this.orderRepository.save(order);
    }

    @Override
    public Order update(Order order, long id) {
        Order orderFind = orderRepository.findById(id).orElse(null);
        orderFind.setId(order.getId());
        orderFind.setRef(order.getRef());
        orderFind.setDescription(order.getDescription());
        orderFind.setPrice_total(order.getPrice_total());
        orderFind.setQuantity_total(order.getQuantity_total());
        orderFind.setState(false);
        orderFind.setDriver(order.getDriver());
        orderFind.setProducts(order.getProducts());
        Order update = orderRepository.save(orderFind);
        return update;
    }

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public void delete(long id) {
        Order orderFind = orderRepository.findById(id).orElse(null);
        orderRepository.deleteById(orderFind.getId());

    }

    @Override
    public Order findById(long id) {
        Order orderFind = orderRepository.findById(id).orElse(null);
        return orderFind;
    }
}
