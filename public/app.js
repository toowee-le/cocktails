const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const recipeURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const categoryURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=';
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
        getCocktailByIngredient(ingredient)
        .then(results => {
            for (drink of results.drinks) {
                createCocktailCard();
            };
        });
        clearResults();
    };
};

function eventDelegation(e) {
    e.preventDefault();

    if(e.target.id == 'getRecipe') {
        getRecipeById(e.target.dataset.id)
        .then(recipe => {
            displayRecipe(recipe);
            displayIngredients(recipe);
        });
    };

    if(e.target.id == 'favorite') {
        getRecipeById(e.target.dataset.id)
        .then(data => {
            const { idDrink, strDrink, strDrinkThumb } = data.recipe[0];
            postData('/api/favorites', {id: idDrink, drink: strDrink, image: strDrinkThumb})
            .then(results => {
                console.log(results);
            });
        });
    }

    if(e.target.id == 'Alcoholic' || e.target.id == 'Non_Alcoholic') {
        getDrinksByAlcohol(e.target.dataset.category)
        .then(results => {
            for (drink of results.drinks) {
                createCocktailCard(drink);
            };
        });

        clearResults();
    }

    if(e.target.id == 'random') {
        getRandomDrink()
        .then(drink => {
            drink.randomDrink.forEach(item => {
                const cocktailCard = document.createElement('div');
                cocktailCard.classList.add('cocktail-card');
                const cocktail = item.strDrink;
                const imgURL = item.strDrinkThumb;
                const cardInnerHTML = `
                    <img src="${imgURL}/preview" alt="Cocktail Thumbnail" class="cocktail-img">
                    <h3>${cocktail}</h3>
                    <div class="btn-container">
                        <button class="get-recipe__btn" id="getRecipe" data-id="${item.idDrink}">See Recipe</button>
                        <button class="favourite__btn" id="favorite" data-id="${item.idDrink}"><i class="far fa-heart"></i></button>
                    </div>`;

                cocktailCard.innerHTML = cardInnerHTML;
                cocktailContainer.appendChild(cocktailCard).classList.add('stretch');
            });
        });
        clearResults();
    };
};

// Fetch cocktail by ingredient from The CocktailDB API
const getCocktailByIngredient = async (ingredient) => {
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

// Fetch drinks by alcohol from The CocktailDB API
const getDrinksByAlcohol = async (type) => {
    let res = await fetch(categoryURL+type);
    let json = await res.json();
    let drink = json.drinks;
    try {
        return {
            drinks: drink
        }
    } catch (error) {
        console.log(`No drinks available`);
        console.log("Error:", error);
    }
}

// Fetch single recipe from The CocktailDB API
const getRecipeById = async (id) => {
    let recipeResponse = await fetch (recipeURL+id);
    let recipeData = await recipeResponse.json();
    let recipes = recipeData.drinks;
    try {
        return {
            recipe: recipes
        }
    } catch (error) {
        console.log(`No recipe found for ${id}`);
        console.log("Error:", error);
    }
}

// Fetch a random drink from The CocktailDB API
const getRandomDrink = async () => {
    let randomResponse = await fetch ('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    let randomData = await randomResponse.json();
    let drink = randomData.drinks;
    try {
        return {
            randomDrink: drink
        }
    } catch (error) {
        console.log('No random drink available');
        console.log("Error:", error);
    }
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const getData = await response.json();
        return getData;
    } catch (error) {
        console.log("Error:", error);
    };
};

// Update UI
function createCocktailCard() {
    const title = document.getElementById('results');
    title.style.display = 'block';
    const cocktailCard = document.createElement('div');
    cocktailCard.classList.add('cocktail-card');
    const cocktail = drink.strDrink;
    const imgURL = drink.strDrinkThumb;
    const cardInnerHTML = `
        <img src="${imgURL}/preview" alt="Cocktail Thumbnail" class="cocktail-img">
        <h3>${cocktail}</h3>
        <div class="btn-container">
            <button class="get-recipe__btn" id="getRecipe" data-id="${drink.idDrink}">See Recipe</button>
            <button class="favourite__btn" id="favorite" data-id="${drink.idDrink}"><i class="far fa-heart"></i></button>
        </div>
    `;

    cocktailCard.innerHTML = cardInnerHTML;
    cocktailContainer.appendChild(cocktailCard);
}

function displayIngredients(recipe) {
    let ingredients = [];

    for (let i = 1; i <= 15; i++) {
        let ingredientsObj = {};
        if (recipe.recipe[0][`strIngredient${i}`] !== null) {
            ingredientsObj.ingredient = recipe.recipe[0][`strIngredient${i}`];
            ingredientsObj.measure = recipe.recipe[0][`strMeasure${i}`];

            ingredients.push(ingredientsObj);
        }
    }

    let htmlTemplate = '';

    ingredients.forEach(ingredient => {
        htmlTemplate+= `
            <div class="ingredient__item">${ingredient.measure} </br> ${ingredient.ingredient}</div>
        `;
    });

    return htmlTemplate;
}

function displayRecipe(recipe) {
    modal.classList.add('modal--active');
    document.body.style.overflowY = 'hidden';
    const modalTitle = document.querySelector('.modal__header');
    const modalPreparation = document.querySelector('.instructions');
    const modalImg = document.querySelector('.modal__img');
    const ingredientsList = document.querySelector('.ingredient__list');

    modalTitle.innerHTML = `${recipe.recipe[0].strDrink}`;
    modalPreparation.innerHTML = `${recipe.recipe[0].strInstructions}`;
    modalImg.src = `${recipe.recipe[0].strDrinkThumb}/preview`;

    ingredientsList.innerHTML = this.displayIngredients(recipe);
}

function clearResults() {
    const form = document.forms["search"];
    form.reset();
    cocktailContainer.innerHTML = '';
}

function clearModal() {
    modal.classList.remove('modal--active');
    document.body.style.overflowY = 'auto';
}

function eventListeners() {
    document.getElementById('search').addEventListener('click', performAction);

    document.getElementById('modalClose').addEventListener('click', clearModal);

    if(document.body) {
        document.body.addEventListener('click', eventDelegation);
    }
}