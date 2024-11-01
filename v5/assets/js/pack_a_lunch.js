let order = {
    soups: null,
    main_dishes: null,
    salads: null,
    drinks: null,
    desserts: null,
};

function addToOrder(meal) {
    order[meal.category] = meal;
    updateOrderDisplay();
}

function updateOrderDisplay() {
    const orderSummary = document.getElementById("order-summary");
    orderSummary.innerHTML = "";

    let totalCost = 0;
    let isOrderEmpty = true;

    for (const [category, meal] of Object.entries(order)) {
        const categoryTitle = document.createElement("b");
        categoryTitle.textContent = getCategoryTitle(category);
        orderSummary.appendChild(categoryTitle);

        const meals = document.createElement("p");

        if (meal) {
            meals.textContent = `${meal.name} - ${meal.price}₽`;
            totalCost += meal.price;
            isOrderEmpty = false;
        } else {
            meals.textContent = "Ничего не выбрано";
        }

        meals.style.display = "block";
        meals.style.margin = "0 1.5rem";
        meals.style.alignItems = "center";
        orderSummary.appendChild(meals);
    }

    if (!isOrderEmpty) {
        const totalContainer = document.createElement("div");
        totalContainer.style.display = "block";
        totalContainer.style.margin = "1rem 0";
        totalContainer.style.alignItems = "center";

        const totalElement = document.createElement("b");
        totalElement.textContent = "Стоимость заказа:";
        totalElement.style.fontSize = "1.2rem";

        const totalCostElement = document.createElement("span");
        totalCostElement.textContent = `${totalCost}₽`;

        totalContainer.appendChild(totalElement);
        totalContainer.appendChild(totalCostElement);
        orderSummary.appendChild(totalContainer);
    } else {
        orderSummary.innerHTML = "<p>Ничего не выбрано</p>";
    }
}

function getCategoryTitle(category) {
    switch (category) {
        case "soups":
            return "Суп";
        case "main_dishes":
            return "Главное блюдо";
        case "drinks":
            return "Напиток";
        case "salads":
            return "Салат или стартер";
        case "desserts":
            return "Десерт";
        default:
            return "";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const categories = {
        soups: document.querySelector("#soups .menu-grid"),
        main_dishes: document.querySelector("#main_dishes .menu-grid"),
        salads: document.querySelector("#salads .menu-grid"),
        drinks: document.querySelector("#drinks .menu-grid"),
        desserts: document.querySelector("#desserts .menu-grid"),
    };

    function displayMeals(category, filter = "all") {
        categories[category].innerHTML = "";

        const filteredMeals = meals.filter(
            (meal) => meal.category === category && (filter === "all" || meal.kind === filter)
        );

        filteredMeals.sort((a, b) => a.name.localeCompare(b.name));

        filteredMeals.forEach((meal) => {
            const mealElement = document.createElement("div");
            mealElement.classList.add("dish");
            mealElement.setAttribute("data-kind", meal.kind);
            
            mealElement.innerHTML = `
                <img src="${meal.image}" alt="${meal.name}">
                <p class="price">${meal.price}₽</p>
                <p class="name">${meal.name}</p>
                <p class="weight">${meal.count}</p>
                <button data-name="${meal.name}" data-price="${meal.price}">Добавить</button>
            `;

            mealElement.querySelector("button").addEventListener("click", () => addToOrder(meal));
            categories[category].appendChild(mealElement);
        });
    }

    Object.keys(categories).forEach((category) => displayMeals(category));

    document.querySelectorAll(".filter-buttons button").forEach((button) => {
        button.addEventListener("click", function () {
            const categorySection = this.closest("section").id;
            const kind = this.getAttribute("data-kind");

            this.closest(".filter-buttons").querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");

            displayMeals(categorySection, kind);
        });
    });
});

document.querySelector('button[type="reset"]').addEventListener("click", () => {
    order = {
        soups: null,
        main_dishes: null,
        salads: null,
        drinks: null,
        desserts: null,
    };
    updateOrderDisplay();
});
