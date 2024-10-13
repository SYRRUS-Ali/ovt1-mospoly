// Initialize an order object to keep track of selected items
const order = {
    soup: null,
    mainDish: null,
    pizza: null,
    salad: null,
    drink: null,
    totalPrice: 0,
};

// Function to update the order summary display and hidden inputs
function updateOrder() {
    // Update soup
    const soupName = order.soup ? order.soup.name : "Блюдо не выбрано";
    const soupPrice = order.soup ? `${order.soup.price}₽` : "0₽";
    document.querySelector('#soup-name').textContent = soupName;
    document.querySelector('#soup-price').textContent = `(${soupPrice})`;
    document.querySelector('#soup-price').style.display = order.soup ? 'inline' : 'none';
    document.querySelector('#hidden-soup').value = soupName; // Update hidden input

    // Update main dish
    const mainName = order.mainDish ? order.mainDish.name : "Блюдо не выбрано";
    const mainPrice = order.mainDish ? `${order.mainDish.price}₽` : "0₽";
    document.querySelector('#main-name').textContent = mainName;
    document.querySelector('#main-price').textContent = `(${mainPrice})`;
    document.querySelector('#main-price').style.display = order.mainDish ? 'inline' : 'none';
    document.querySelector('#hidden-main').value = mainName; // Update hidden input

    // Update pizza
    const pizzaName = order.pizza ? order.pizza.name : "Блюдо не выбрано";
    const pizzaPrice = order.pizza ? `${order.pizza.price}₽` : "0₽";
    document.querySelector('#pizza-name').textContent = pizzaName;
    document.querySelector('#pizza-price').textContent = `(${pizzaPrice})`;
    document.querySelector('#pizza-price').style.display = order.pizza ? 'inline' : 'none';
    document.querySelector('#hidden-pizza').value = pizzaName; // Update hidden input

    // Update salad
    const saladName = order.salad ? order.salad.name : "Блюдо не выбрано";
    const saladPrice = order.salad ? `${order.salad.price}₽` : "0₽";
    document.querySelector('#salad-name').textContent = saladName;
    document.querySelector('#salad-price').textContent = `(${saladPrice})`;
    document.querySelector('#salad-price').style.display = order.salad ? 'inline' : 'none';
    document.querySelector('#hidden-salad').value = saladName; // Update hidden input

    // Update drink
    const drinkName = order.drink ? order.drink.name : "Блюдо не выбрано";
    const drinkPrice = order.drink ? `${order.drink.price}₽` : "0₽";
    document.querySelector('#drink-name').textContent = drinkName;
    document.querySelector('#drink-price').textContent = `(${drinkPrice})`;
    document.querySelector('#drink-price').style.display = order.drink ? 'inline' : 'none';
    document.querySelector('#hidden-drink').value = drinkName; // Update hidden input

    // Calculate total price
    order.totalPrice = (order.soup?.price || 0) + (order.mainDish?.price || 0) + 
                       (order.pizza?.price || 0) + (order.salad?.price || 0) + 
                       (order.drink?.price || 0);
    
    // Update total price display
    document.querySelector('#order-total span').textContent = `${order.totalPrice}₽`;
    // Show or hide total price block
    document.querySelector('#order-total').style.display = order.totalPrice > 0 ? 'block' : 'none';
    document.querySelector('#hidden-total').value = `${order.totalPrice}₽`; // Update hidden input
}

// Function to add a dish to the order
function addDish(type, name, price) {
    order[type] = { name, price };
    updateOrder();
}

// Add event listeners for all the buttons
document.querySelectorAll('#soups .dish button').forEach(button => {
    button.addEventListener('click', (e) => {
        const dish = e.target.closest('.dish');
        const name = dish.querySelector('.name').textContent;
        const price = parseInt(dish.querySelector('.price').textContent);
        addDish('soup', name, price);
    });
});

document.querySelectorAll('#main-dishes .dish button').forEach(button => {
    button.addEventListener('click', (e) => {
        const dish = e.target.closest('.dish');
        const name = dish.querySelector('.name').textContent;
        const price = parseInt(dish.querySelector('.price').textContent);
        addDish('mainDish', name, price);
    });
});

document.querySelectorAll('#pizzas .dish button').forEach(button => {
    button.addEventListener('click', (e) => {
        const dish = e.target.closest('.dish');
        const name = dish.querySelector('.name').textContent;
        const price = parseInt(dish.querySelector('.price').textContent);
        addDish('pizza', name, price);
    });
});

document.querySelectorAll('#salads .dish button').forEach(button => {
    button.addEventListener('click', (e) => {
        const dish = e.target.closest('.dish');
        const name = dish.querySelector('.name').textContent;
        const price = parseInt(dish.querySelector('.price').textContent);
        addDish('salad', name, price);
    });
});

document.querySelectorAll('#drinks .dish button').forEach(button => {
    button.addEventListener('click', (e) => {
        const dish = e.target.closest('.dish');
        const name = dish.querySelector('.name').textContent;
        const price = parseInt(dish.querySelector('.price').textContent);
        addDish('drink', name, price);
    });
});

// Reset button functionality
document.querySelector('button[type="reset"]').addEventListener('click', () => {
    // Reset order object
    order.soup = null;
    order.mainDish = null;
    order.pizza = null;
    order.salad = null;
    order.drink = null;
    order.totalPrice = 0;
    
    // Reset the display
    updateOrder();
});
