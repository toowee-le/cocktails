const cocktailContainer = document.getElementById('cocktailContainer');
let baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

document.getElementById('search').addEventListener('click', performAction);

function performAction(e) {
    e.preventDefault();
    const form = document.forms["search"]["ingredient"].value;
    if (form == "") {
        alert("Please enter an ingredient.");
        return false;
    } else {
        const ingredient = document.getElementById('ingredient').value;
        getCocktail(baseURL, ingredient);
        resetForm();
    }
}

function resetForm() {
    const form = document.forms["search"];
    form.reset();
}

// Fetch Cocktail API data and send to the server
const getCocktail = async (baseURL, ingredient) => {
    const response = await fetch(baseURL+ingredient);
    const data = await response.json();
    const drinks = data.drinks;
    try {
        for (drink of drinks) {
            createCocktailCard();
        }
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

function createCocktailCard() {
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