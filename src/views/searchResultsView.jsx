export function SearchResultsView(props) {
    const {
        searchResults, 
        onDishClick,
    } = props;
    
    function handleDishClick(event, dish) {
        // prevent default link behavior
        event.preventDefault();

        // pass dish object to parent component
        if (onDishClick) {
            onDishClick(dish);
        }
    }

    
    return (
        <div>
        {searchResults.map(dish => {
            const imageURL = dish.image.startsWith('http')
            ? dish.image
            : `https://spoonacular.com/recipeImages/${dish.image}`;

            return (
            <span
                key={dish.id}
                className="dish-item"
                onClick={event => handleDishClick(event, dish)}
            >
                <img src={imageURL} alt={dish.title} height={'100'} />
                <div>{dish.title}</div>
            </span>
            );
        })}
        </div>
    );
  }