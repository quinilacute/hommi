document.addEventListener('DOMContentLoaded', function() {
  // Welcome Popup Component
  if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    WelcomePopup();
}
});

function WelcomePopup() {
let isOpen = true;

const handleClose = () => {
    isOpen = false;
    renderPopup();
};

const renderPopup = () => {
    if (isOpen) {
        const popupOverlay = document.createElement('div');
        popupOverlay.classList.add('popup-overlay');

        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', handleClose);

        const heading = document.createElement('h1');
        heading.textContent = 'Welcome!';

        const paragraph = document.createElement('p');
        paragraph.textContent = 'Would you like to...';

        const loginButton = document.createElement('button');
        loginButton.textContent = 'Login';

        const createAccountButton = document.createElement('button');
        createAccountButton.textContent = 'Create Account';

        popupContent.append(closeButton, heading, paragraph, loginButton, createAccountButton);
        popupOverlay.appendChild(popupContent);
        document.body.appendChild(popupOverlay);
    } else {
        const popupOverlay = document.querySelector('.popup-overlay');
        if (popupOverlay) {
            popupOverlay.remove();
        }
    }
};

renderPopup();
}
  

  // Login Popup Component
  function LoginPopup() {
      const form = document.querySelector('form');
      const errorElement = document.querySelector('.error');

      form.addEventListener('submit', function(event) {
          event.preventDefault();
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;

          // Simulate login process
          if (email === 'user@example.com' && password === 'password') {
              window.location.href = '/dashboard.html'; // Redirect on successful login
          } else {
              errorElement.style.display = 'block'; // Show error message
          }
      });
  }

  // Welcome Component
  function WelcomeComponent() {
      const welcomeImage = 'path_to_welcome_image'; 
      const TMImage = 'path_to_TM_image'; 

      const welcomeDiv = document.createElement('div');
      welcomeDiv.style.textAlign = 'center';

      const welcomeImg = document.createElement('img');
      welcomeImg.src = welcomeImage;
      welcomeImg.alt = 'Welcome';
      welcomeImg.style.marginBottom = '20px';
      welcomeDiv.appendChild(welcomeImg);

      const tmImg = document.createElement('img');
      tmImg.src = TMImage;
      tmImg.alt = 'TM Mark';
      tmImg.style.position = 'absolute';
      tmImg.style.bottom = '0';
      tmImg.style.left = '50%';
      tmImg.style.transform = 'translateX(-50%)';
      welcomeDiv.appendChild(tmImg);

      document.body.appendChild(welcomeDiv);
  }

  

  //for product page 
  document.addEventListener("DOMContentLoaded", () => {
    const cartKey = 'cartItems';

    // Load cart items from local storage
    const loadCartItems = () => {
        const storedItems = localStorage.getItem(cartKey);
        return storedItems ? JSON.parse(storedItems) : [];
    };

    // Save cart items to local storage
    const saveCartItems = (items) => {
        localStorage.setItem(cartKey, JSON.stringify(items));
    };

    // Add item to the cart
    const addToCart = (item) => {
        const cartItems = loadCartItems();
        cartItems.push(item);
        saveCartItems(cartItems);
        alert(`${item.name} has been added to your cart.`);
    };

    // Render products on the product page
    const renderProducts = () => {
        const products = [
            { id: 1, name: 'Step Table', price: 40, description: 'The table has been used for only two months, lack of space made us want to sell it. It is durable and comfortable for reading purposes especially. It can also be used for kitchen purposes.', specification: 'Long, Two side multipurpose table', image: 'step_table.jpg' },
            { id: 2, name: 'Plate', price: 40, description: 'Durable and comfortable for various uses.', specification: 'Standard size', image: 'plate.jpg' },
            { id: 3, name: 'TV', price: 200, description: 'High-definition television.', specification: '42 inch', image: 'tv.jpg' },
            { id: 4, name: 'Fridge', price: 300, description: 'Spacious and energy-efficient.', specification: 'Double door', image: 'fridge.jpg' },
            { id: 5, name: 'Shoe', price: 30, description: 'Comfortable and stylish.', specification: 'Size 10', image: 'shoe.jpg' },
            { id: 6, name: 'Carpet', price: 50, description: 'Soft and durable.', specification: '5x7 feet', image: 'carpet.jpg' },
            { id: 7, name: 'Box', price: 10, description: 'Sturdy and reliable.', specification: 'Medium size', image: 'box.jpg' },
            { id: 8, name: 'Fan', price: 40, description: 'Powerful and quiet.', specification: '3-speed settings', image: 'fan.jpg' },
            { id: 9, name: 'Locker', price: 100, description: 'Secure and spacious.', specification: '3 compartments', image: 'locker.jpg' },
            { id: 10, name: 'Handwatch', price: 60, description: 'Elegant and accurate.', specification: 'Water-resistant', image: 'watch.jpg' },
            { id: 11, name: 'Laptop', price: 600, description: 'High-performance laptop.', specification: '16GB RAM', image: 'laptop.jpg' },
            { id: 12, name: 'Rice', price: 15, description: 'High-quality rice.', specification: '5kg bag', image: 'rice.jpg' },
            { id: 13, name: 'Chair', price: 25, description: 'Comfortable chair.', specification: 'Ergonomic design', image: 'chair.jpg' }
        ];

        const productContainer = document.querySelector('.product');
        if (productContainer) {
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');

                productItem.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="${product.name}">
                    <p>Price: $${product.price}</p>
                    <p>Description: ${product.description}</p>
                    <p>Specification: ${product.specification}</p>
                    <button data-id="${product.id}">Add to Cart</button>
                `;

                productItem.querySelector('button').addEventListener('click', () => addToCart(product));
                productContainer.appendChild(productItem);
            });
        }
    };

    // Render cart items on the cart page
    const renderCart = () => {
        const cartItems = loadCartItems();
        const cartContainer = document.querySelector('.cart-items');
        const subtotalElement = document.querySelector('.summary p:nth-of-type(1)');
        const totalElement = document.querySelector('.checkout-button button');

        if (cartContainer && subtotalElement && totalElement) {
            cartContainer.innerHTML = '';
            let subtotal = 0;

            cartItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');

                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="quantity">
                        <button class="decrease" data-index="${index}">-</button>
                        <span>1</span>
                        <button class="increase" data-index="${index}">+</button>
                        <button class="remove" data-index="${index}">Remove</button>
                    </div>
                    <div class="spec">
                        <h3>${item.name}</h3>
                        <p>Specification: ${item.specification}</p>
                        <p>Price: $${item.price}</p>
                    </div>
                `;

                cartContainer.appendChild(cartItem);
                subtotal += item.price;
            });

            subtotalElement.textContent = `Subtotal: $${subtotal}`;
            totalElement.textContent = `Proceed to Checkout - Total: $${subtotal}`;
        }
    };

    // Initialize product and cart pages
    if (document.querySelector('.product')) {
        renderProducts();
    }

    if (document.querySelector('.cart-items')) {
        renderCart();
    }
});
  // Account Creation
  function AccountCreation() {
      const registrationForm = document.getElementById('registrationForm');
      const errorMessage = document.getElementById('errorMessage');

      registrationForm.addEventListener('submit', function(event) {
          event.preventDefault();

          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const number = document.getElementById('number').value;
          const password = document.getElementById('password').value;
          const school = document.getElementById('school').value;
          const location = document.getElementById('location').value;
          const state = document.getElementById('state').value;
          const profile = document.getElementById('profile').files[0];

          if (!name || !email || !number || !password || !school || !location || !state || !profile) {
              errorMessage.textContent = 'All fields are required';
              return;
          }

          const formData = new FormData();
          formData.append('name', name);
          formData.append('email', email);
          formData.append('number', number);
          formData.append('password', password);
          formData.append('school', school);
          formData.append('location', location);
          formData.append('state', state);
          formData.append('profile', profile);

          const xhr = new XMLHttpRequest();
          xhr.open('POST', 'upload_profile.php'); 
          xhr.onload = function() {
              if (xhr.status === 200) {
                  const response = JSON.parse(xhr.responseText);
                  if (response.success) {
                      localStorage.setItem('profileUrl', response.url);
                      alert('Registration successful!');
                      window.location.href = 'login.html';
                  } else {
                      errorMessage.textContent = 'Failed to upload profile picture';
                  }
              } else {
                  errorMessage.textContent = 'Failed to upload profile picture';
              }
          };
          xhr.onerror = function() {
              errorMessage.textContent = 'Failed to upload profile picture';
          };
          xhr.send(formData);
      });
  }

  // Example Data Population
  function ExampleDataPopulation() {
      const item = {
          name: "Product Name",
          specification: "Product Specification",
          price: 10.99,
          quantity: 1
      };

      const subtotal = 10.99;
      const deliveryFee = 2.99;
      const total = subtotal + deliveryFee;

      document.querySelector('.cart-item img').src = 'product_image.jpg';
      document.querySelector('.cart-item h3').textContent = item.name;
      document.querySelector('.cart-item p:nth-of-type(1)').textContent = `Specification: ${item.specification}`;
      document.querySelector('.cart-item p:nth-of-type(2)').textContent = `Price: $${item.price}`;
      document.querySelector('.quantity span').textContent = item.quantity;
      document.querySelector('.summary p:nth-of-type(1)').textContent = `Subtotal: $${subtotal}`;
      document.querySelector('.summary p:nth-of-type(2)').textContent = `Delivery Fee: $${deliveryFee}`;
      document.querySelector('.checkout-button button').textContent = `Proceed to Checkout - Total: $${total}`;
  }

  // Checkout Page
  function CheckoutPage() {
      const cartItems = [
          { id: 1, name: 'Product 1', price: 10 },
          { id: 2, name: 'Product 2', price: 15 }
      ];

      function calculateSubtotal(cartItems) {
          return cartItems.reduce((total, item) => total + item.price, 0);
      }

      function calculateDeliveryFee() {
          return 2.99; 
      }

      function calculateTotal(subtotal, deliveryFee) {
          return subtotal + deliveryFee;
      }

      function populateOrderSummary(cartItems, subtotal, deliveryFee, total) {
          const summaryContainer = document.querySelector('.checkout-page > div > div');
          summaryContainer.innerHTML = '';

          cartItems.forEach(item => {
              const itemElement = document.createElement('div');
              itemElement.innerHTML = `<p>${item.name} - $${item.price}</p>`;
              summaryContainer.appendChild(itemElement);
          });

          const subtotalElement = document.createElement('p');
          subtotalElement.textContent = `Subtotal: $${subtotal}`;
          summaryContainer.appendChild(subtotalElement);

          const deliveryFeeElement = document.createElement('p');
          deliveryFeeElement.textContent = `Delivery Fee: $${deliveryFee}`;
          summaryContainer.appendChild(deliveryFeeElement);

          const totalElement = document.createElement('p');
          totalElement.textContent = `Total: $${total}`;
          summaryContainer.appendChild(totalElement);
      }

      const subtotal = calculateSubtotal(cartItems);
      const deliveryFee = calculateDeliveryFee();
      const total = calculateTotal(subtotal, deliveryFee);
      populateOrderSummary(cartItems, subtotal, deliveryFee, total);
  }

  // Initialize Components
  WelcomePopup();
  LoginPopup();
  WelcomeComponent();
  AccountCreation();
  ExampleDataPopulation();
  CheckoutPage();
});