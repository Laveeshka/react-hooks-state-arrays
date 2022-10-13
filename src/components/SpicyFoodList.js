import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

//When the button is clicked, add the newly generated spicy food to the array
//When a user clicks on a food, that food should be removed from the list
//UPDATE: When a user clicks on a food, that food's heat level is incremented by 1
//User can filter the list to only show foods from a certain cuisine

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [cuisine, setCuisine] = useState("All");

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    console.log(newFood);

    //create an array copy of foods
    const newFoods = [...foods, newFood];
    setFoods(newFoods); //then use the setter function to update the state variable
  }

  //figure out a way to update food array in state so that it no longer includes the food
  //Remember, we need to create a new array here
  // function handleClick(id){
  //   const newFoods = foods.filter(food => food.id !== id); //Using the filter array method to filter out the food to be deleted. It returns a new array, génial

  //   setFoods(newFoods); //update state
  // }

  //When a user clicks on a food, that food's heat level is incremented by 1
  //We can use the map method here to generate a new array but we need to modify the value of the heatLevel property of the clicked food
  function handleClick(id) {
    const newFoods = foods.map(food => {
      if (food.id === id) {
        food.heatLevel++;
        return food;
      }
      return food;
    }) //check for an id match. Increment heatLevel if positive. Then return food. Otherwise, return food as is
    console.log(newFoods);
    setFoods(newFoods);
  }

  function handleChange(e){
    console.log(`value is: ${e.target.value}`); //works

    //update cuisine state variable
    const newCuisine = e.target.value;
    setCuisine(newCuisine);
    console.log(cuisine);
  }

   //create filtered foods array
   const filteredFoods = foods.filter(food => {
    if (cuisine === "All"){
      return food;
    }
    else {
      return food.cuisine === cuisine;
    }
  });

  const foodList = filteredFoods.map((food) => (
    <li key={food.id} onClick={() => handleClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
      <select onChange={handleChange} name="filter">
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
    </div>
  );
}

export default SpicyFoodList;
