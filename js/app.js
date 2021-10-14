
//Instanciate the classes
const ui = new UI(),
  cocktail=new CocktailAPI(),
  cocktailDb=new CocktailDB();


//Create the Event Listeners
function eventListeners(){

  //Add EventLister on the Search Category
document.addEventListener('DOMContentLoaded',documentReady)

  //Add Event Listeners When the Form is Submitted
  const searchForm =document.querySelector('#search-form');
  if(searchForm){

    searchForm.addEventListener('submit', getCocktails);
  }

  //The results div Listeners
  const resultDiv = document.querySelector('#results');
  if(resultDiv){
    resultDiv.addEventListener('click', resultsDelegation)
  }
}

eventListeners();

//Get functions
function getCocktails(events){
  events.preventDefault();
  const searchTerm = document.querySelector('#search').value;
  
//Check something is on the Search input 
  if(searchTerm === ''){
    //Call User Interface print Message
    ui.printMessage('Please Add Something Into the Form', 'danger');

  }else{
    let serverResponse;

    //Type of the Service(ingridients, name, cocktail)
    const type = document.querySelector('#type').value;

    //Evaluate the type of the Method and then Execute the Query
    switch (type){
      case "name":
        serverResponse =cocktail.getDrinksByName(searchTerm);
        break;
        case "ingredient":
        serverResponse =cocktail.getDrinksByIngredients(searchTerm);
        break;
        case "category":
        serverResponse =cocktail.getDrinksByCategory(searchTerm);
        break;
        case "alcohol":
        serverResponse =cocktail.getDrinksByAlcohol(searchTerm);
        break;
    }

      ui.clearResults();
        //Query by the Name of the Drink
    
      serverResponse.then(cocktails => {
          if(cocktails.cocktails.drinks === null){
            //Nothing Exsists
            ui.printMessage('There are no Match, Try Again','danger')
          } else{
            if (type ==="name"){
              //Display with Ingredients
              ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
            }else{
              //Display without Ingredients (category, alcohol, ingredient)
              ui.displayDrinks(cocktails.cocktails.drinks);
            }
            
          }
      })
  }
}

//Delegation for the Modal Results
function resultsDelegation(e){
  e.preventDefault();

  if (e.target.classList.contains("get-recipe")){
    cocktail.getSingleRecipe(e.target.dataset.id)
      .then(recipe => {
        //Displays Single recipe into a Modal
        ui.displaySingleRecipe( recipe.recipe.drinks[0])
      })
      .catch(error => {
        console.log(error);
      })
  }

  if (e.target.classList.contains("favorite-btn")){
    if (e.target.classList.contains("is-favorite")){
      //remove the Class
      e.target.classList.remove("is-favorite");
      e.target.textContent = "+";

      //Remove from Storage
      cocktailDb.removeFromDB(e.target.dataset.id);
    }else{
      //add the class
      e.target.classList.add("is-favorite");
      e.target.textContent = "-";


      //Get Info
      const cardBody = e.target.parentElement;
      const drinkInfo = {
        id: e.target.dataset.id,
        name: cardBody.querySelector('.card-title').textContent,
        image: cardBody.querySelector('.card-img-top').src
      }
      //Add into the Local Storage
      cocktailDb.saveIntoDB(drinkInfo)
    }
    
  }
    
}
function documentReady(){
  // Display on load the favorites from  storage
  ui.isFavorite();

  //Select the search category
  const searchCategory = document.querySelector('.search-category');
  if(searchCategory){
    ui.displayCategories();
  }

  const favoriteTable = document.querySelector('#favorites');
  if(favoriteTable){

      //Get the Favorites from the Local Storage and Display Them
      const drinks = cocktailDb.getFromDB();
      ui.displayFavorites(drinks);

      //When view or Delete or Delete are Clicked
      favoriteTable.addEventListener('click', (e) =>{
        e.preventDefault();
        

        //Delegation
        if(e.target.classList.contains('get-recipe')){
          cocktail.getSingleRecipe(e.target.dataset.id)
            .then(recipe =>{
              //Display Single RECIPE INTO THE Modal

              ui.displaySingleRecipe( recipe.recipe.drinks[0])
            })
            .catch(error => {
              console.log(error);
            })
        }

        // when remove button is Clicked in Favorites
        if(e.target.classList.contains('remove-recipe')){
          //remove from DOM
          ui.removeFavorite(e.target.parentElement.parentElement);

          //Remove from the Local Storage
          cocktailDb.removeFromDB(e.target.dataset.id);
        }
      })

  }
}