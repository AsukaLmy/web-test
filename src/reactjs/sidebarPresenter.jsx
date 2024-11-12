import { SidebarView } from "../views/sidebarView.jsx"; 
import { observer } from "mobx-react-lite";

const Sidebar = observer(
    function SidebarRender(props) {
        // #people and dishes
        const numberOfGuests = props.model.numberOfGuests;
        const dishes = props.model.dishes;

        // when #people changes
        function handleNumberChange(newNumber) {
            //debugger
            if (newNumber > 0) {  // make sure number>0
                props.model.setNumberOfGuests(newNumber);
                console.log("number of people changes to", newNumber);
            }
        }

        // when dish is clicked
        function handleDishClick(dish) {
            // set id
            props.model.setCurrentDishId(dish.id);
            console.log("dish selected:", dish.title);
        }

        // delete
        function handleRemoveDish(dish) {
            props.model.removeFromMenu(dish);
            console.log("dish removed:", dish.title);
        }

        // render SidebarView
        return (
            <SidebarView
                number={numberOfGuests}
                dishes={dishes}
                onNumberChange={handleNumberChange}
                onDishClick={handleDishClick}
                onRemoveDish={handleRemoveDish}
            />
        );
    }
);

export { Sidebar };
