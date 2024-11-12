/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import { resolvePromise } from './resolvePromise.js';
import { searchDishes, getDishDetails } from './dishSource.js';
const model = {  
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,  // null means "intentionally empty"
    searchParams: {},
    searchResultsPromiseState: {},
    currentDishPromiseState: {},

    observers: [],  // 新增的观察者数组

    addObserver(callback) {
        this.observers.push(callback);
    },

    removeObserver(callback) {
        this.observers = this.observers.filter(obs => obs !== callback);
    },

    notifyObservers() {
        this.observers.forEach(callback => callback());
    },
    
    setCurrentDishId(id){
        // this.currentDishId = dishId;
        //console.log("current dish set to:", dish.title)
        if (!id || id === this.currentDishId) {
            // if id is false or equal to currentDishId, do nothing
            return;
        }
    
        this.currentDishId = id;

        this.currentDishPromiseState = {};
    
        // if id is legal, carry on
        if (id) {
            const prms = getDishDetails(id);
            resolvePromise(prms, this.currentDishPromiseState)
                // .then(() => this.notifyObservers())
                // .catch(() => this.notifyObservers());
        } else {
            this.notifyObservers();
        }
    },
    
    setNumberOfGuests(number){
        if (!Number.isInteger(number) || number <= 0) {
            throw new Error('number of guests not a positive integer');
        }
        this.numberOfGuests = number;
        this.notifyObservers();
    },
    
    addToMenu(dishToAdd){
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
        this.dishes= [...this.dishes, dishToAdd];
        this.notifyObservers();
    },

    // filter callback exercise
    removeFromMenu(dishToRemove){
        function shouldWeKeepDishCB(dish){
            return dish.id !== dishToRemove.id;
        }
        this.dishes= this.dishes.filter(shouldWeKeepDishCB);

        //console.log("dish removed:", dish.title);
        this.notifyObservers();
    },
    
 
    // more methods will be added here, don't forget to separate them with comma!
    setSearchQuery(query) {
        this.searchParams.query = query;
        this.notifyObservers();
    },

    setSearchType(type) {
        this.searchParams.type = type;
        this.notifyObservers();
    },

    doSearch(params) {
        const prms = searchDishes(params);
        resolvePromise(prms, this.searchResultsPromiseState)
            .then(() => this.notifyObservers())
            .catch(() => this.notifyObservers());
    },
};

export {model};
