document.addEventListener("DOMContentLoaded", () => {
    const sections = ["soups", "main_dishes", "salads", "drinks", "desserts"];

    sections.forEach(sectionId => {
        sortSectionByName(sectionId);
    });
});

function sortSectionByName(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const menuGrid = section.querySelector(".menu-grid");
    if (!menuGrid) return;

    const dishesArray = Array.from(menuGrid.querySelectorAll(".dish"));

    dishesArray.sort((a, b) => {
        const nameA = a.querySelector(".name").textContent.trim();
        const nameB = b.querySelector(".name").textContent.trim();
        return nameA.localeCompare(nameB);
    });

    menuGrid.innerHTML = "";

    dishesArray.forEach(dish => {
        menuGrid.appendChild(dish);
    });
}