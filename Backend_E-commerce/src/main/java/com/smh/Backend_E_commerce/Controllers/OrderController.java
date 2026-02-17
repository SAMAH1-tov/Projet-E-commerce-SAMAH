package com.smh.Backend_E_commerce.Controllers;



import com.smh.Backend_E_commerce.Services.OrderService;
import com.smh.Backend_E_commerce.entities.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/orders/")

public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("save")
    public ResponseEntity<Order> create(@RequestBody Order order) {
        Order saved = orderService.save(order);
        System.out.println("Order");
        System.out.println(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("findAll")
    public List<Order> list() {
        return orderService.findAll();
    }


    @PutMapping("update/{id}")
    public  ResponseEntity<Order> update(@PathVariable ("id") long id,
                                         @RequestBody Order order)
    {
        Order update = orderService.update(order,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(update);

    }
    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable ("id") long id){
        orderService.delete(id);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity getById(@PathVariable ("id") long id){
        Order orderFind = orderService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(orderFind);
    }
}
