class CocktailDB{

//Save the recipe into Local Storage
saveIntoDB(drink){
  const drinks = this.getFromDB();
  drinks.push(drink);

  //Add the new Array into the Local Storage
  localStorage.setItem('drinks', JSON.stringify(drinks))
}

//Remove from the Local Storage
removeFromDB(id){
  const drinks = this.getFromDB();

  //Loop
  drinks.forEach((drink, index) => {
    if(id === drink.id){
      drinks.splice(index, 1);

    }
  });
  //Set the Array into the Local storage
  localStorage.setItem('drinks', JSON.stringify(drinks));
}



//Return recipes
getFromDB(){

  let drinks;
  //Check from the LocalStorage
  if (localStorage.getItem('drinks')=== null){
    drinks = [];

  }else{
    drinks = JSON.parse(localStorage.getItem('drinks'));
  }
  return drinks;
}



}