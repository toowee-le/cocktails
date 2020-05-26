const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const recipeURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const cocktailContainer = document.getElementById('cocktailContainer');
const modal = document.getElementById('modal');

eventListeners();

function performAction(e) {
    e.preventDefault();

    const form = document.forms["search"]["ingredient"].value;
    if (form == "") {
        alert("Please enter an ingredient.");
        return false;
    } else {
        const ingredient = document.getElementById('ingredient').value;
        getCocktail(ingredient)
        .then(results => {
            for (drink of results.drinks) {
                createCocktailCard();
            }
        })
        clearResults();
    }
}

function eventDelegation(e) {
    e.preventDefault();

    if(e.target.id == 'getRecipe') {
        getRecipe(e.target.dataset.id)
        .then(recipe => {
            displayRecipe(recipe.recipe[0].strInstructions)
        })
    }
}

// Fetch cocktail by ingredient from The CocktailDB API
const getCocktail = async (ingredient) => {
    let ingredientResponse = await fetch(baseURL+ingredient);
    let ingredientData = await ingredientResponse.json();
    let drink = ingredientData.drinks;
    try {
        return {
            drinks: drink
        }
    } catch (error) {
        console.log(`No ingredients found for ${ingredient}`)
        console.log("Error:", error);
    }
}

// Fetch single recipe from The CocktailDB API
const getRecipe = async (id) => {
    let recipeResponse = await fetch (recipeURL+id);
    let recipeData = await recipeResponse.json();
    let recipes = recipeData.drinks;
    try {
        return {
            recipe: recipes
        }
    } catch (error) {
        console.log(`No recipe found for ${id}`)
        console.log("Error:", error)
    }
}

// const getCocktail = async (baseURL, ingredient) => {
//     const response = await fetch(baseURL+ingredient);
//     const data = await response.json();
//     const drinks = data.drinks;
//     try {
//         console.log(drinks);
//         for (drink of drinks) {
//             createCocktailCard();
//             getRecipe(drink.idDrink);
//         }
//         const postData = { drinks };
//         const options = {
//             method: 'POST',
//             credentials: 'same-origin',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(postData)
//         };
//         const response = await fetch('/api/cocktails', options);
//         const getData = await response.json();
//         console.log(getData);
//     } catch (error) {
//         console.log("error", error);
//     }
// }

// Update UI
function createCocktailCard() {
    const cocktailCard = document.createElement('div');
    cocktailCard.classList.add('cocktail-card');
    const cocktail = drink.strDrink;
    const imgURL = drink.strDrinkThumb;
    const cardInnerHTML = `
        <img src="${imgURL}/preview" alt="Cocktail Thumbnail" class="cocktail-img">
        <h3>${cocktail}</h3>
        <div class="btn-container">
            <button class="get-recipe__btn" id="getRecipe" data-id="${drink.idDrink}">See Recipe</button>
            <button class="favourite__btn" data-id="${drink.idDrink}"><i class="far fa-heart"></i></button>
        </div>
    `;

    cocktailCard.innerHTML = cardInnerHTML;
    cocktailContainer.appendChild(cocktailCard);
}

function displayRecipe(recipe) {
    modal.classList.add('modal--active');
    const modalTitle = document.querySelector('.modal__header');
    const ingredients = document.querySelector('.ingredient__list');
    const preparation = document.createElement('p');
}

function clearResults() {
    const form = document.forms["search"];
    form.reset();
    cocktailContainer.innerHTML = '';
}

function clearModal() {
    modal.classList.remove('modal--active');
}

function eventListeners() {
    document.getElementById('search').addEventListener('click', performAction);

    document.getElementById('modalClose').addEventListener('click', clearModal);

    if(cocktailContainer) {
        cocktailContainer.addEventListener('click', eventDelegation);
    }
}