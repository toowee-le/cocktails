const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const recipeURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';


document.getElementById('search').addEventListener('click', performAction);

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
        resetForm();
    }
}

// Fetch cocktail data by ingredient from The CocktailDB API
const getCocktail = async (ingredient) => {
    let ingredientResponse = await fetch(baseURL+ingredient);
    let ingredientData = await ingredientResponse.json();
    let drinks = ingredientData.drinks;
    let id = drinks[0].idDrink;
    let recipeResponse = await fetch(recipeURL+id);
    let recipeData = await recipeResponse.json();
    let recipes = recipeData.drinks;
    try {
        return {
            drinks: drinks,
            id: id,
            recipes: recipes
        }
    } catch (error) {
        console.log(`No ingredients found for ${ingredient}`)
        console.log("Error:", error);
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
    const cocktailContainer = document.getElementById('cocktailContainer');
    const cocktailCard = document.createElement('div');
    cocktailCard.classList.add('cocktail-card');
    const cocktail = drink.strDrink;
    const imgURL = drink.strDrinkThumb;
    const cardInnerHTML = `
        <img src="${imgURL}/preview" alt="Cocktail Thumbnail" class="cocktail-img">
        <h3>${cocktail}</h3>
        <div class="buttons">
            <button class="get-recipe__btn" id="getRecipe" data-id="${drink.idDrink}"><a href="">See Recipe</a></button>
            <button class="favourite__btn" data-id="${drink.idDrink}"><a href=""><i class="far fa-heart"></i></a></button>
        </div>
    `;

    cocktailCard.innerHTML = cardInnerHTML;

    cocktailContainer.appendChild(cocktailCard);
}

function resetForm() {
    const form = document.forms["search"];
    form.reset();
}