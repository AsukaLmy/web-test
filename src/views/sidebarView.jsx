import { sortDishes, dishType, menuPrice } from '/src/utilities.js';

export function SidebarView(props){
    // return (
    // <div className="debug">
    //     <button disabled={props.number === 1}>-</button>
    //     <span title="guests">{props.number}</span>
    //     <button>+</button>
    // </div>
    // );
    // -
    function handleDecrease() {
        const newNumber = props.number - 1;
        console.log("- clicked, newnumber is:", newNumber);
        props.onNumberChange(newNumber);
    }

    // +
    function handleIncrease() {
        // debugger
        const newNumber = props.number + 1;
        console.log("+ clicked, newnumber is", newNumber);
        props.onNumberChange(newNumber);
    }
    

    // render every row
    function dishTableRowCB(dish) {
        // remove button
        function handleRemove() {
            console.log( dish.title ,"is deleted");
            props.onRemoveDish(dish)
        }

        // when we click disdes
        function handleDishClick(event) {
            event.preventDefault();
            console.log("dish link clicked:", dish.title);
            props.onDishClick(dish)
        }

        return (
            <tr key={dish.id}>
                {/* button */}
                <td><button onClick={handleRemove}>x</button></td>
                {/* dishtitle */}
                <td><a href="#" onClick={handleDishClick}>{dish.title}</a></td>
                {/* dishtype */}
                <td>{dishType(dish) || " "}</td>
                {/* price */}
                <td className="align-right">{(dish.pricePerServing * props.number).toFixed(2)}</td>
            </tr>
        );

    }

    // rank
    const sortedDishes = sortDishes([...props.dishes]);

    // totalprice
    const totalPrice = (menuPrice(props.dishes) * props.number).toFixed(2);

    return (
        <div className="debug">
            {/*button of people number change */}
            <button disabled={props.number === 1} onClick={handleDecrease}>-</button>
            <span title="guests">{props.number}</span>
            <button onClick={handleIncrease}>+</button>

            {/*table of dishes */}
            <table>
                <tbody>
                    {
                        sortedDishes.map(dishTableRowCB)
                    }
                    
                    <tr>
                        <td></td>
                        <td colSpan="1">Total:</td>
                        <td></td>
                        <td className="align-right">{totalPrice}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
     

}