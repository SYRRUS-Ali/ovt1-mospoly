// Array of dish objects
const dishes = [
    {
        keyword: "gazpacho",
        name: "Гаспачо",
        price: 195,
        category: "soup",
        count: "300 мл",
        image: "assets/images/menu/gazpacho.jpg",
    },
    {
        keyword: "borsh",
        name: "Борщ",
        price: 210,
        category: "soup",
        count: "300 мл",
        image: "assets/images/menu/borsh.jpg",
    },
    {
        keyword: "mushroomsoup",
        name: "Грибной суп",
        price: 220,
        category: "soup",
        count: "300 мл",
        image: "assets/images/menu/mushroom_soup.jpg",
    },
    {
        keyword: "norwegiansoup",
        name: "Норвежский суп",
        price: 240,
        category: "soup",
        count: "300 мл",
        image: "assets/images/menu/norwegian_soup.jpg",
    },
    {
        keyword: "chickensoup",
        name: "Куриный суп",
        price: 200,
        category: "soup",
        count: "300 мл",
        image: "assets/images/menu/chickensoupe.jpg",
    },
    {
        keyword: "lasagna",
        name: "Лазанья",
        price: 385,
        category: "main",
        count: "450 г",
        image: "assets/images/menu/lasagna.jpg",
    },
    {
        keyword: "caesarsalad",
        name: "Цезарь",
        price: 350,
        category: "main",
        count: "250 г",
        image: "assets/images/menu/caesarsalad.jpg",
    },
    {
        keyword: "greeksalad",
        name: "Греческий салат",
        price: 300,
        category: "main",
        count: "250 г",
        image: "assets/images/menu/greeksalad.jpg",
    },
    {
        keyword: "chickencutlets",
        name: "Куриные котлеты с картофельным пюре",
        price: 420,
        category: "main",
        count: "450 г",
        image: "assets/images/menu/chickencutletsandmashedpotatoes.jpg",
    },
    {
        keyword: "fourcheese",
        name: "Паста 4 сыра",
        price: 410,
        category: "main",
        count: "350 г",
        image: "assets/images/menu/fourcheese.jpg",
    },
    {
        keyword: "friedpotatoes",
        name: "Жареный картофель с грибами",
        price: 190,
        category: "main",
        count: "250 г",
        image: "assets/images/menu/friedpotatoeswithmushrooms1.jpg",
    },
    {
        keyword: "applejuice",
        name: "Яблочный сок",
        price: 120,
        category: "drink",
        count: "300 мл",
        image: "assets/images/menu/applejuice.jpg",
    },
    {
        keyword: "grapefruitjuice",
        name: "Грейпфрутовый сок",
        price: 130,
        category: "drink",
        count: "300 мл",
        image: "assets/images/menu/grapefruitjuice.jpg",
    },
    {
        keyword: "orangejuice",
        name: "Апельсиновый сок",
        price: 120,
        category: "drink",
        count: "300 мл",
        image: "assets/images/menu/orangejuice.jpg",
    },
    {
        keyword: "carrotjuice",
        name: "Морковный сок",
        price: 115,
        category: "drink",
        count: "300 мл",
        image: "assets/images/menu/carrotjuice.jpg",
    },
    {
        keyword: "friedpotatoes",
        name: "Жареный картофель",
        price: 150,
        category: "main",
        count: "200 г",
        image: "assets/images/menu/friedpotatoeswithmushrooms1.jpg",
    },
    {
        keyword: "pastramisalad",
        name: "Салат с пастрами",
        price: 320,
        category: "main",
        count: "250 г",
        image: "assets/images/menu/pastramisalad.jpg",
    },
    {
        keyword: "margarita",
        name: "Пицца Маргарита",
        price: 450,
        category: "main",
        count: "350 г",
        image: "assets/images/menu/margarita.jpg",
    },
];

// Function to display dishes in their respective categories
function displayDishes() {
    // Sort dishes alphabetically by name
    const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));

    // Get container elements for each category
    const soupContainer = document.getElementById("soups");
    const mainContainer = document.getElementById("mains");
    const drinkContainer = document.getElementById("drinks");

    // Clear existing content
    soupContainer.innerHTML = '<h2>Супы</h2>';
    mainContainer.innerHTML = '<h2>Основные блюда</h2>';
    drinkContainer.innerHTML = '<h2>Напитки</h2>';

    // Display each dish
    sortedDishes.forEach(dish => {
        const dishElement = document.createElement("div");
        dishElement.className = "dish";
        dishElement.setAttribute("data-dish", dish.keyword);
        
        dishElement.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="price">${dish.price}₽</p>
            <p class="name">${dish.name}</p>
            <p class="weight">${dish.count}</p>
            <button onclick="addToOrder('${dish.keyword}')">Добавить</button>
        `;

        // Append the dish element to the correct category container
        switch (dish.category) {
            case "soup":
                soupContainer.appendChild(dishElement);
                break;
            case "main":
                mainContainer.appendChild(dishElement);
                break;
            case "drink":
                drinkContainer.appendChild(dishElement);
                break;
        }
    });
}

// Function to add a dish to the order
function addToOrder(keyword) {
    const selectedDish = dishes.find(dish => dish.keyword === keyword);
    
    // Update the order summary
    updateOrder(selectedDish);
}

// Function to update the order summary
function updateOrder(selectedDish) {
    const orderBlock = document.getElementById("order-block");
    const totalPriceElement = document.getElementById("total-price");
    
    // Find existing order items
    const existingOrderItem = orderBlock.querySelector(`div[data-dish="${selectedDish.keyword}"]`);

    if (existingOrderItem) {
        // If the dish is already in the order, remove it
        orderBlock.removeChild(existingOrderItem);
    } else {
        // If not, create a new order item
        const orderItem = document.createElement("div");
        orderItem.setAttribute("data-dish", selectedDish.keyword);
        orderItem.innerHTML = `
            <p>${selectedDish.name} - ${selectedDish.price}₽</p>
        `;
        orderBlock.appendChild(orderItem);
    }

    // Calculate total price
    const orderItems = orderBlock.querySelectorAll('[data-dish]');
    let totalPrice = 0;

    orderItems.forEach(item => {
        const priceText = item.innerText.split('- ')[1].replace('₽', '');
        totalPrice += parseInt(priceText);
    });

    // Update the total price display
    if (totalPrice > 0) {
        totalPriceElement.style.display = 'block';
        totalPriceElement.innerText = `Стоимость заказа: ${totalPrice}₽`;
    } else {
        totalPriceElement.style.display = 'none';
        orderBlock.innerHTML = '<p>Ничего не выбрано</p>';
    }
}

// Display dishes on page load
document.addEventListener('DOMContentLoaded', displayDishes);
