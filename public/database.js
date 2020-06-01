const getData = async () => {
    const response = await fetch('/api/favorites');
    const data = await response.json();

    console.log(data);
    for (item of data) {
        displayFavorites(item);
    }
}

getData();

// Update UI
function displayFavorites() {
    const favoriteContainer = document.getElementById('favoriteContainer');
    const favoriteCard = document.createElement('div');
    favoriteCard.classList.add('favorite-card');
    const drink = item.drink;
    const id = item.id;
    const imgURL = item.image;
    const cardInnerHTML = `
        <img src="${imgURL}/preview" class="favorite__img" alt="Drink">
        <div class="favorite__details">
            <h3 class="favorite__drink-name">${drink}</h3>
            <div class="btn-container">
                <button class="get-recipe__btn" id="getRecipe" data-id="${id}">See Recipe</button>
                <button class="remove__btn" id="favorite">Remove</button>
            </div>
        </div>
    `;
    favoriteCard.innerHTML = cardInnerHTML;
    favoriteContainer.appendChild(favoriteCard);
}