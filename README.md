Basic E-Commerce web-app essential functionalities:

1. User Authentication and Authorization (DONE)
   Sign Up / Login: Users should be able to create an account and log in to make purchases and view their order history.
   Password Recovery: Basic functionality to reset passwords if a user forgets them.
2. Product Management (DONE)
   Product Listings: Display products with essential details like images, price, and name.
   Product Details: A page for each product with a description and "Add to Cart" button.
   Categories (optional): Organizing products into basic categories (e.g., Electronics, Clothing) for easy browsing.
3. Shopping Cart (DONE)
   Add to Cart: Users should be able to add products to their cart.
   View Cart: Display a list of items in the cart, showing product name, price, and quantity.
   Update Cart: Allow customers to change quantities or remove items.
4. Checkout Process
   Shipping Information: Users should be able to enter their shipping address.
   Payment Integration: Basic integration with a payment gateway (e.g., Stripe, PayPal) for processing payments.
   Order Confirmation: After payment, users should receive an order confirmation with order details.
5. Order Management (for customers)
   Order History: Users should be able to view their previous orders and the status of current orders.
------------------------------------------------- Enough till this ---------------------------------------------------
6. Basic Admin Dashboard
   Product Management: Admins should be able to add/edit/delete products.
   Order Management: Admins should be able to view and manage customer orders.
7. Basic Security
   SSL Encryption: Ensure secure communication, especially during checkout.
   Password Hashing: Store passwords securely.
8. Mobile Responsiveness
   Responsive Design: The site should work well on both desktop and mobile devices.
   These are the core features that will allow a basic eCommerce platform to function. Advanced features like reviews, wishlists, discounts, and detailed analytics can be added as the platform evolves.

PENDING:
   2.4 Modify Customer model for address field and create a updateShippingAddress API for the the loggedIn customer to add shippingAddress to database.

   After this goto 4.2 Checkout Process starting from Payment Integration
