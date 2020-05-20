const cocktailContainer = document.getElementById('cocktailContainer');
let baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

document.getElementById('search').addEventListener('click', performAction);

function performAction(e) {
    e.preventDefault();
    const ingredient = document.getElementById('ingredient').value;
    fetchCocktail(baseURL, ingredient);
    updateUI();
}

// Fetch Cocktail API data and send to the server
const fetchCocktail = async (baseURL, ingredient) => {
    const res = await fetch(baseURL+ingredient)
    try {
        const data = await res.json();
        const drinks = data.drinks;
        const postData = { drinks };
        const options = {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        };
        const response = await fetch('/api/cocktails', options);
        const getData = await response.json();
        console.log(getData);
    } catch (error) {
        console.log("error", error);
    }
}

const updateUI = async () => {
    const res = await fetch('/api');
    const data = await res.json();

    for (drink of data) {
        const cocktailCard = document.createElement('div');
        cocktailCard.classList.add('cocktail-card');

        const cocktail = drink.strDrink;
        const imgURL = drink.strDrinkThumb;

        const cardInnerHTML = `
            <img src="${imgURL}/preview" alt="Cocktail Thumbnail" class="cocktail-img">
            <h3>${cocktail}</h3>
        `;

        cocktailCard.innerHTML = cardInnerHTML;

        cocktailContainer.appendChild(cocktailCard);
    }
    
}