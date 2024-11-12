/* uncomment the export below to enable the 1.1.2 test suite! */
export function compareIngredientsCB(ingredientA, ingredientB){
    // compare aisle 
    if (ingredientA.aisle < ingredientB.aisle) {
        return -1;
    } 
    else if (ingredientA.aisle > ingredientB.aisle) {
        return 1;
    } 
    else {
        // compare name when aisle is the same
        if (ingredientA.name < ingredientB.name) {
            return -1;
        } else if (ingredientA.name > ingredientB.name) {
            return 1;
        } else {
            return 0;
        }
    }
    //1.1.2
}

export function sortIngredients(ingredients){
    // create a copy
    const ingredientsCopy = [...ingredients];
    ingredientsCopy.sort(compareIngredientsCB);
    return ingredientsCopy;// 1.1.2
}

export function isKnownTypeCB(type){
    // don't forget the return keyword (goes for all functions below)
    return type === "starter" || type === "main course" || type === "dessert";
}

export function dishType(dish){
    // That's what we want
    const knownTypes = ["starter", "main course", "dessert"];

    // extract dishtype from input
    const dishTypes = dish.dishTypes;

    // in case dishtype is empty
    if (Array.isArray(dishTypes)) {
        // find
        const findType = dishTypes.find(type => knownTypes.includes(type));
        // return findtype if it's found
        return findType ? findType : "";
    } else {
        // when no dishtype
        return "";
    }
}

export function compareDishesCB(dishA, dishB){
    // difine the mapping between type and number
    const typeOrder = {
        "": 0,                
        "starter": 1,         
        "main course": 2,     
        "dessert": 3          
    };

    const typeA = dishType(dishA);
    const typeB = dishType(dishB);

    // mapping, if not exist return 0
    const orderA = typeOrder[typeA] !== undefined ? typeOrder[typeA] : 0;
    const orderB = typeOrder[typeB] !== undefined ? typeOrder[typeB] : 0;

    // return difference
    return orderA - orderB;
}


export function sortDishes(dishes){
    // clone
    const dishesCopy = [...dishes];
    // rank
    dishesCopy.sort(compareDishesCB);
    return dishesCopy;
}

export function menuPrice(dishesArray){
    // calculate
    const totalPrice = dishesArray.reduce((accumulator, dish) => {
        return accumulator + dish.pricePerServing;
    }, 0); // 0 if no price

    return totalPrice;
 
}

/* 
  This function is already implemented as it is more JavaScript + algorithms than interaction programming

   Given a menu of dishes, generate a list of ingredients. 
   If an ingredient repeats in several dishes, it will be returned only once, with the amount added up 
   
   As this is not an algorithm course, the function is mostly written but you have 2 callback passing TODOs.
*/
export function shoppingList(dishes){
    const result={}; // object used as mapping between ingredient ID and ingredient object

    // we define the callback inside the function, though this is not strictly needed in this case. But see below.
    function keepJustIngredientsCB(dish){
        return dish.extendedIngredients;
    }
    
    // ingredientCB must be defined inside shopingList() because it needs access to `result`
    // you will often need to define a callback inside the function where it is used, so it has access to arguments and other variables
    function ingredientCB(ingredient){
        if(result[ingredient.id] === undefined){  // more general: !result[ingredient.id]
            // since result[ingredient.id] is not defined, it means that the ingredient is not taken into account yet
            // so we associate the ingredient with the ID
            result[ingredient.id]={...ingredient};
            
            // JS Notes about the line above:
            // 1)    result[ingredient.id] 
            // In JS object.property is the same as object["property"] but the second notation is more powerful because you can write
            // object[x]  where x=="property"
            
            // 2)    {...ingredient } creates a *copy* of the ingredient (object spread syntax)
            // we duplicate it because we will change the object below
        } else {
            // since result[ingredient.id] is not defined, it means that the ingredient has been encountered before.
            // so we add up the amount:
            result[ingredient.id].amount +=  ingredient.amount;
        }
    }

    const arrayOfIngredientArrays= dishes.map(keepJustIngredientsCB/*TODO pass the callback that transforms a dish to its ingredients */);
    const allIngredients= arrayOfIngredientArrays.flat();    
    allIngredients.forEach(ingredientCB/* TODO: pass the callback that treats an ingredient */);

    // Note: the 3 lines above can be written as a function chain:
    // dishes.map(callback1).flat().forEach(callback2);

    // now we transform the result object into an array: we drop the keys and only keep the values
    return Object.values(result);
}

