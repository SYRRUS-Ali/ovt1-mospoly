const order = {
    soup: null,
    mainDish: null,
    salad: null,
    drink: null,
    dessert: null,
    totalPrice: 0,
};

function updateOrder() {
    document.querySelector('#soup-name').textContent = '';
    document.querySelector('#main-name').textContent = '';
    document.querySelector('#salad-name').textContent = '';
    document.querySelector('#drink-name').textContent = '';
    document.querySelector('#dessert-name').textContent = '';

    if (order.soup) {
        document.querySelector('#soup-name').textContent = `${order.soup.name} (${order.soup.price}₽)`;
    }

    if (order.mainDish) {
        document.querySelector('#main-name').textContent = `${order.mainDish.name} (${order.mainDish.price}₽)`;
    }

    if (order.salad) {
        document.querySelector('#salad-name').textContent = `${order.salad.name} (${order.salad.price}₽)`;
    }

    if (order.drink) {
        document.querySelector('#drink-name').textContent = `${order.drink.name} (${order.drink.price}₽)`;
    }

    if (order.dessert) {
        document.querySelector('#dessert-name').textContent = `${order.dessert.name} (${order.dessert.price}₽)`;
    }

    order.totalPrice = (order.soup?.price || 0) + (order.mainDish?.price || 0) +
                       (order.salad?.price || 0) + (order.drink?.price || 0) +
                       (order.dessert?.price || 0);
    
    document.querySelector('#order-total span').textContent = `${order.totalPrice}₽`;
    
    document.querySelector('#order-total').style.display = order.totalPrice > 0 ? 'block' : 'none';

    const isAnyDishSelected = order.soup || order.mainDish || order.salad || order.drink || order.dessert;
    document.querySelector('#order-summary').style.display = isAnyDishSelected ? 'block' : 'none';
    document.querySelector('#nothing-selected').style.display = isAnyDishSelected ? 'none' : 'block';

    document.querySelector('#hidden-total').value = `${order.totalPrice}₽`;

    document.querySelector('#order-soup').style.display = order.soup ? 'block' : 'none';
    document.querySelector('#order-main').style.display = order.mainDish ? 'block' : 'none';
    document.querySelector('#order-salad').style.display = order.salad ? 'block' : 'none';
    document.querySelector('#order-drink').style.display = order.drink ? 'block' : 'none';
    document.querySelector('#order-dessert').style.display = order.dessert ? 'block' : 'none';
}

function addDish(type, name, price) {
    order[type] = { name, price };
    updateOrder();
}

document.querySelectorAll('#soups .dish button').forEach(button => {
    button.addEventListener('click', (e) => {
        const dish = e.target.closest('.dish');
        const name = dish.querySelector('.name').textContent;
        const price = parseInt(dish.querySelector('.price').textContent);
        addDish('soup', name, price);
    });
});

document.querySelectorAll('#main_dishes .dish button').forEach(button => {
    button.addEventListener('click', (e) => {
        const dish = e.target.closest('.dish');
        const name = dish.querySelector('.name').textContent;
        const price = parseInt(dish.querySelector('.price').textContent);
        addDish('mainDish', name, price);
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

document.querySelectorAll('#desserts .dish button').forEach(button => {
    button.addEventListener('click', (e) => {
        const dish = e.target.closest('.dish');
        const name = dish.querySelector('.name').textContent;
        const price = parseInt(dish.querySelector('.price').textContent);
        addDish('dessert', name, price);
    });
});

document.querySelector('button[type="reset"]').addEventListener('click', () => {
    order.soup = null;
    order.mainDish = null;
    order.salad = null;
    order.drink = null;
    order.dessert = null;
    order.totalPrice = 0;
    
    updateOrder();
});

function validateOrder() {
    const hasSoup = !!order.soup;
    const hasMainDish = !!order.mainDish;
    const hasSalad = !!order.salad;
    const hasDrink = !!order.drink;
    const hasDessert = !!order.dessert;

    const validCombinations = [
        (hasSoup && hasMainDish && hasSalad && hasDrink),
        (hasSoup && hasMainDish && hasDrink && !hasSalad),
        (hasSoup && hasSalad && hasDrink && !hasMainDish),
        (hasMainDish && hasSalad && hasDrink && !hasSoup),
        (hasMainDish && hasDrink && !hasSoup && !hasSalad),
        (hasDessert && !hasSoup && !hasMainDish && !hasSalad && !hasDrink)
    ];

    const isValidOrder = validCombinations.some(combo => combo);

    if (!isValidOrder) {
        showNotification("Выберите допустимые блюда для заказа.");
        return false;
    }

    return true;
}

function showNotification(message) {
    const notificationContainer = document.getElementById('notification');
    notificationContainer.textContent = message;
    notificationContainer.style.display = 'block';

    const closeButton = document.createElement('button');
    closeButton.innerHTML = "Окей 👌";
    closeButton.style.marginTop = "10px";
    closeButton.style.backgroundColor = "var(--button-filter)";
    closeButton.style.color = "var(--white-color)";
    closeButton.style.border = "none";
    closeButton.style.padding = "10px 20px";
    closeButton.style.cursor = "pointer";
    closeButton.style.borderRadius = "5px";

    closeButton.addEventListener('click', () => {
        notificationContainer.style.display = 'none';
        notificationContainer.textContent = "";
    });

    if (notificationContainer.querySelector('button')) {
        notificationContainer.querySelector('button').remove();
    }

    notificationContainer.appendChild(closeButton);
}


document.querySelector('#order-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateOrder()) {
        console.log('Order is valid. Proceeding with submission...');

        e.target.submit();
    }
});