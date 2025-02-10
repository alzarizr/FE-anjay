document.addEventListener("DOMContentLoaded", function () {
    const allTemplates = [
        { id: 1, name: "Template 1", img: "assets/template1.jpg" },
        { id: 2, name: "Template 2", img: "assets/template2.jpg" },
        { id: 3, name: "Template 3", img: "assets/template3.jpg" }
    ];

    const inventoryContainer = document.querySelector(".inventory-list");
    let ownedTemplates = JSON.parse(localStorage.getItem("ownedTemplates")) || [];

    if (ownedTemplates.length === 0) {
        inventoryContainer.innerHTML = "<p>No templates owned yet.</p>";
    } else {
        ownedTemplates.forEach(id => {
            const template = allTemplates.find(t => t.id === id);
            if (template) {
                const templateCard = document.createElement("div");
                templateCard.classList.add("template-card");
                templateCard.innerHTML = `
                    <img src="${template.img}" alt="${template.name}">
                    <h3>${template.name}</h3>
                    <button class="use-button" onclick="useTemplate(${template.id})">Use</button>
                `;
                inventoryContainer.appendChild(templateCard);
            }
        });
    }
});

function useTemplate(id) {
    alert("Using template " + id);
}
