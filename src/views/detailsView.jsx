export function DetailsView(props) {
    const { 
        dishData, 
        guests, 
        isDishInMenu, 
        onAddToMenu,
    } = props;
  
    if (!dishData) {
      return <div>waiting...</div>;
    }
  
    const pricePerServing = dishData.pricePerServing;
    const totalPrice = pricePerServing * guests;

  
    function handleAddToMenuClick() {
      if (onAddToMenu) {
        onAddToMenu();
      }
    }
  
    return (
      <div>
        <h2>{dishData.title}</h2>
        <img src={dishData.image} alt={dishData.title} />
  
        <p>Price per serving: ${pricePerServing.toFixed(2)}</p>
        <p>Total price for {guests} guests: ${totalPrice.toFixed(2)}</p>
  
        <h3>Ingredients per person:</h3>
        <ul>
          {dishData.extendedIngredients.map(ingredient => (
            <li key={ingredient.id}>
              {ingredient.name}{' '}
              {ingredient.amount}{' '}
              {ingredient.unit}{' '}
            </li>
          ))}
        </ul>
  
        {/* <h3>Instructions:</h3>  */}
        <div ref={(el) => el && (el.innerText = dishData.instructions)}></div>
        {/* <div
          dangerouslySetInnerHTML={{ __html: dishData.instructions }}
        /> */}
  
        <p>
          For more information, see the original recipe at{' '}
          <a href={dishData.sourceUrl} target="_blank" rel="noopener noreferrer">
            {dishData.sourceName || 'Source'}
          </a>
        </p>
  
        <button disabled={isDishInMenu} onClick={handleAddToMenuClick}>
          Add to Menu
        </button>
      </div>
    );
  }