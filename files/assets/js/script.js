document.addEventListener("DOMContentLoaded", function () {
    // Data template untuk Shop
    const shopTemplates = [
        { id: 1, name: "Template 1", price: 10, img: "assets/images/template1.jpg" },
        { id: 2, name: "Template 2", price: 15, img: "assets/images/template2.jpg" },
        { id: 3, name: "Template 3", price: 20, img: "assets/images/template3.jpg" }
    ];

    // Menambahkan Template ke dalam halaman
    const shopContainer = document.querySelector(".template-list");
    shopTemplates.forEach(template => createTemplateCard(template));

    // Fungsi untuk membuat template card
    function createTemplateCard(template) {
        const templateCard = document.createElement("div");
        templateCard.classList.add("template-card");
        templateCard.innerHTML = `
            <img src="${template.img}" alt="${template.name}">
            <h3>${template.name}</h3>
            <p class="price">$${template.price}</p>
            <button class="buy-button" data-template-id="${template.id}">Buy</button>
        `;
        shopContainer.appendChild(templateCard);
    }

    // Fungsi pencarian template
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener("keyup", function () {
        let filter = searchInput.value.toLowerCase();
        filterTemplates(filter);
    });

    // Fungsi untuk menyaring template berdasarkan pencarian
    function filterTemplates(filter) {
        const cards = document.querySelectorAll('.template-card');
        cards.forEach(card => {
            let title = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = title.includes(filter) ? '' : 'none';
        });
    }

    // Menambahkan event listener untuk tombol "Buy"
    shopContainer.addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains("buy-button")) {
            const templateId = parseInt(event.target.dataset.templateId);
            buyTemplate(templateId);
        }
    });

    // Fungsi untuk membeli template
    function buyTemplate(templateId) {
        let ownedTemplates = JSON.parse(localStorage.getItem("ownedTemplates")) || [];
        
        if (!ownedTemplates.includes(templateId)) {
            ownedTemplates.push(templateId);
            localStorage.setItem("ownedTemplates", JSON.stringify(ownedTemplates));
            showPurchaseNotification();
        } else {
            alert("You already own this template.");
        }
    }

    // Fungsi untuk menampilkan notifikasi setelah membeli template
    function showPurchaseNotification() {
        const notif = document.createElement("div");
        notif.innerText = "Template purchased successfully!";
        notif.classList.add("purchase-notification");
        document.body.appendChild(notif);

        setTimeout(() => notif.remove(), 3000);
    }
});
