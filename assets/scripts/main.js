// main.js
// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Store the sample data first from the file storage
  populateWithSampleData();
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  const recipes = window.localStorage.getItem('recipes');
  if (!recipes) return [];
  else return JSON.parse(recipes);
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. TODO - Get a reference to the <main> element
  let mainElement = document.querySelector('main');
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  for(let i = 0; i < recipes.length; ++i) {
    const newRecipeCard = document.createElement('recipe-card');
    newRecipeCard.data = recipes[i];
    mainElement.appendChild(newRecipeCard);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  window.localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. TODO - Get a reference to the <form> element
  const formElement = document.querySelector('form');
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    // Steps B4-B9 will occur inside the event listener from step B3
    // B4. TODO - Create a new FormData object from the <form> element reference above
    const formData = new FormData(formElement);
    // B5. TODO - Create an empty object (I'll refer to this object as recipeObject to
    //            make this easier to read), and then extract the keys and corresponding
    //            values from the FormData object and insert them into recipeObject
    let recipeObject = {};
    for(let entry of formData.entries()) {
      recipeObject[entry[0]] = entry[1];
    }
    // B6. TODO - Create a new <recipe-card> element
    const newRecipeElement = document.createElement('recipe-card');
    // B7. TODO - Add the recipeObject data to <recipe-card> using element.data
    newRecipeElement.data = recipeObject;
    // B8. TODO - Append this new <recipe-card> to <main>
    document.querySelector('main').appendChild(newRecipeElement);
    // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
    //            then save the recipes array back to localStorage
    const currentRecipes = getRecipesFromStorage();
    saveRecipesToStorage(currentRecipes.concat(recipeObject));
  });

  // B10. TODO - Get a reference to the "Clear Local Storage" button
  const clearStorageButton = document.querySelector('.danger');
  // B11. TODO - Add a click event listener to clear local storage button
  clearStorageButton.addEventListener('click', (event) => {
    // Steps B12 & B13 will occur inside the event listener from step B11
    // B12. TODO - Clear the local storage
    // B13. TODO - Delete the contents of <main>
    window.localStorage.clear();
    document.querySelector('main').innerHTML = '';
  });

}

const populateWithSampleData = () => {
  let fileContents = `
  [
    {
      "imgSrc": "./assets/images/1_spooky-ghost-cookies.jpeg",
      "imgAlt": "Spooky Ghost Cookies",
      "titleLnk": "https://www.delish.com/holiday-recipes/halloween/a28637917/ghost-cookies-recipe/",
      "titleTxt": "Spooky Ghost Cookies",
      "organization": "Delish.com",
      "rating": 5,
      "numRatings": 1,
      "lengthTime": "2 hr",
      "ingredients": "Light corn syrup, almond, black food coloring, powdered sugar,"
    },
    {
      "imgSrc": "./assets/images/2_frightfully-easy-ghost-cookies.jpeg",
      "imgAlt": "Ghost cookies in pumpkin bowl",
      "titleLnk": "https://www.pillsbury.com/recipes/frightfully-easy-ghost-cookies/bed2af7e-59a0-4b68-be25-1dcaeca66254",
      "titleTxt": "Frightfully Easy Ghost Cookies",
      "organization": "Pillsbury",
      "rating": 4,
      "numRatings": 90,
      "lengthTime": "30 min",
      "ingredients": "Peanut butter filled, chocolate chips, candy coating"
    },
    {
      "imgSrc": "./assets/images/3_ingredient-ghost-halloween-cookies.jpeg",
      "imgAlt": "Ghost cookies in metal tin",
      "titleLnk": "https://butterwithasideofbread.com/easy-ghost-halloween-cookies/",
      "titleTxt": "3 Ingredient Easy Ghost Halloween Cookies",
      "organization": "Butter with a Side of Bread",
      "rating": 0,
      "numRatings": 0,
      "lengthTime": "10 min",
      "ingredients": "White almond bark, mini chocolate chips"
    }
  ]  
  `;
  saveRecipesToStorage(JSON.parse(fileContents));
}