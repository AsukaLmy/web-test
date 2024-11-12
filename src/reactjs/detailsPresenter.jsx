import { model } from '../DinnerModel.js';
import { DetailsView } from '../views/detailsView.jsx';
//import { observer } from "mobx-react-lite";
function detailsPresenter() {
    
    const [, setModelState] = useState({});
  
    useEffect(() => {
      function observer() {
        setModelState({});
      }
      model.addObserver(observer);
      return () => model.removeObserver(observer);
    }, []);
  
    const {
      currentDishId,
      currentDishPromiseState,
      numberOfGuests,
      dishes,
    } = model;
  
    // no dish selected
    if (!currentDishId) {
      return <div>please select a dish for details</div>;
    }
  
    // load
    if (currentDishPromiseState.promise && !currentDishPromiseState.data && !currentDishPromiseState.error) {
      return <div>loading...</div>;
    }
  
    //error
    if (currentDishPromiseState.error) {
      return <div>error: {currentDishPromiseState.error.message}</div>;
    }
  
    // data
    if (currentDishPromiseState.data) {
      const dishData = currentDishPromiseState.data;
      const isDishInMenu = dishes.some(dish => dish.id === dishData.id);
    function handleAddToMenu() {
        model.addToMenu(dishData);
      }

    return (
        <DetailsView
          dishData={dishData}
          guests={numberOfGuests}
          isDishInMenu={isDishInMenu}
          onAddToMenu={handleAddToMenu}
        />
      );
    }
  
    // default
    return <div>no data</div>;
  }
  
export default detailsPresenter;
  