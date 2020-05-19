let baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

document.getElementById('search').addEventListener('click', performAction);

function performAction(e) {
    e.preventDefault();
    const ingredient = document.getElementById('ingredient').value;
    getCocktails(baseURL, ingredient);
}


const getCocktails = async (baseURL, ingredient) => {
    // Fetch data from Cocktail API
    const res = await fetch(baseURL+ingredient)
    try {
        const data = await res.json();
        const drinks = data.drinks;
        console.log(drinks);
        const postData = { drinks };
        const options = {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        };
    } catch (error) {
        console.log("error", error);
    }
}