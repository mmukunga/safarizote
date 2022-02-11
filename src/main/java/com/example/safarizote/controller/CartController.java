package com.example.safarizote.controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.safarizote.model.Cart;
import com.example.safarizote.model.CartItem;
import com.example.safarizote.model.ContactUs;
import com.example.safarizote.repository.CartRepository;
import com.example.safarizote.utils.JavaEmailClient;

@RestController
@RequestMapping("/cart")
public class CartController {
	@Autowired
	private CartRepository repository;
	@Autowired
	private JavaEmailClient emailSender;

	@RequestMapping(method = RequestMethod.GET, value = "/ordersCount")
	public long getOrderCountInCart() {
		Iterable<Cart> iter = repository.findAll();
		long count = StreamSupport.stream(iter.spliterator(), false).count();
		return count;
	}

	@PostMapping("/api/sendMail")
	public ResponseEntity<String> sendMail(@RequestBody ContactUs email) {
		Map<String, String> model = new HashMap<>();
		model.put("name", email.getEmail());
		model.put("value", "Welcome to ASB Notebook!!");
		try {
			String response = emailSender.sendMail(email, model);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}

	@RequestMapping(method = RequestMethod.GET, value = "/productsAmount")
	public BigDecimal getProductAmountInCart() {
		Iterable<Cart> iter = repository.findAll();
		Cart cart = StreamSupport.stream(iter.spliterator(), false)
				.collect(Collectors.toList()).get(0);
		Set<CartItem> items = cart.getItems();

		BigDecimal amount = new BigDecimal(0);
		for (CartItem stock : items) {
			amount.add(stock.getPrice());
		}

		return amount;
	}

	@RequestMapping(method = RequestMethod.GET, value = "/productsOrderList")
	public Set<CartItem> getProductsOrderList() {
		Iterable<Cart> iter = repository.findAll();
		List<Cart> lst = StreamSupport.stream(iter.spliterator(), false)
				.collect(Collectors.toList());
		return lst.get(0).getItems();
	}

	@RequestMapping(method = RequestMethod.POST, produces = "application/json", value = "/addToCart")
	public CartItem addToCart(@RequestBody CartItem order) {
		Iterable<Cart> iter = repository.findAll();
		Cart cart = StreamSupport.stream(iter.spliterator(), false)
				.collect(Collectors.toList()).get(0);

		Set<CartItem> orders = cart.getItems();

		if (orders != null && orders.contains(order)) {
			CartItem oldOrder = orders.stream()
					.filter(s -> s.getId() == order.getId())
					.findFirst().orElse(null);

			oldOrder.setQuantity(oldOrder.getQuantity() + 1);
			return oldOrder;
		} else {
			if (orders == null) {
				orders = new HashSet<>();
			}
			orders.add(order);
			return order;
		}
	}

	@RequestMapping(method = RequestMethod.PUT, produces = "application/json", path = "/updateQuantity")
	public Set<CartItem> updateProductQuantity(@RequestBody CartItem updatedOrder) {
		Iterable<Cart> iter = repository.findAll();
		Cart cart = StreamSupport.stream(iter.spliterator(), false)
				.collect(Collectors.toList()).get(0);

		CartItem safariOrder = cart.getItems().stream()
				.filter(s -> s.getId() == updatedOrder.getId())
				.findFirst().orElse(null);

		if (safariOrder != null) {
			safariOrder.setQuantity(updatedOrder.getQuantity());
		}

		return cart.getItems();
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/deleteFromCart/{id}")
	public ResponseEntity<?> deleteFromCartRest(@PathVariable(value = "id") Long id) {
		Iterable<Cart> iter = repository.findAll();
		Cart cart = StreamSupport.stream(iter.spliterator(), false)
				.collect(Collectors.toList()).get(0);

		CartItem safariOrder = cart.getItems().stream()
				.filter(s -> s.getId() == id)
				.findFirst().orElse(null);

		if (safariOrder != null) {
			cart.getItems().remove(safariOrder);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
}