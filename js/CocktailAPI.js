class CocktailAPI{

  async getDrinksByName(name){
    //search by Name
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

    //Returns a Json Response
    const cocktails = await apiResponse.json();
    
    return {
      cocktails
    }
  }

  async getDrinksByIngredients(ingredient){
    //Search by the Ingredients ingredient
    const apiResponse= await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)

    //Wait for the Response then Return Json
    const cocktails = await apiResponse.json();

    return {
      cocktails
    }
  }


async getSingleRecipe(id){
  //Search by Ingredients
  const apiResponse = await fetch (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)

  //Wait for the Return Json
  const recipe = await apiResponse.json();
  
  return{
        recipe
  }
}

//Retreive all the Categories from the REST API
async getCategories(){
  const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);

  //Wait for Response and Return Json
  const categories = await apiResponse.json();

  return{
    categories
  }
}

async getDrinksByCategory(category){
  //Search by the Ingredients categories
  const apiResponse= await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)

  //Wait for the Response then Return Json
  const cocktails = await apiResponse.json();

  return {
    cocktails
  }
}

async getDrinksByAlcohol(term){

 //Search by either Alcoholic or Non-Alcoholic
 const apiResponse= await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`)

 //Wait for the Response then Return Json
 const cocktails = await apiResponse.json();

 return {
   cocktails
 }
}

}
