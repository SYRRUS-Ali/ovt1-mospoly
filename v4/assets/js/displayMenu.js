// displayMenu.js

// Assuming you have a section for each category in your HTML with IDs
const soupsContainer = document.getElementById("soups");
const mainsContainer = document.getElementById("mains");
const drinksContainer = document.getElementById("drinks");

// Sort dishes by category and name
const sortedDishes = dishes.sort((a, b) => {
    if (a.category === b.category) {
        return a.name.localeCompare(b.name);
    }
    return a.category.localeCompare(b.category);
});

// Display dishes
sortedDishes.forEach(dish => {
    const dishElement = document.createElement('div');
    dishElement.className = 'dish';
    dishElement.setAttribute('data-dish', dish.keyword);
    
    dishElement.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="price">${dish.price}₽</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button>Добавить</button>
    `;

    // Append to the correct category container
    if (dish.category === 'soup') {
        soupsContainer.appendChild(dishElement);
    } else if (dish.category === 'main') {
        mainsContainer.appendChild(dishElement);
    } else if (dish.category === 'drink') {
        drinksContainer.appendChild(dishElement);
    }

    // Add event listener to the button
    dishElement.querySelector('button').addEventListener('click', () => {
        addToOrder(dish.keyword);
    });
});
