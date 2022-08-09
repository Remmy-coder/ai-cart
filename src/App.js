import { useEffect, useState } from "react";
import alanBtn from '@alan-ai/alan-sdk-web';

function App() {

  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(()=> {
    alanBtn({
      key: '5e65a85b8f9b0b587fcdbf0f7182f5a72e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'getMenu') {
          setMenuItems(commandData.data)
        }
      },
  })
  }, [])

  const addToCart = (menuItems) => {
    setCart((oldCart) =>{
      return [...oldCart, menuItems]
    })
  }
  
  return (
    <div className="App">
     {menuItems.map((menuItems) => (
        <li key={menuItems.name}>
          {menuItems.name} - {menuItems.price} - {menuItems.category}
          <button onClick={()=> addToCart(menuItems)}>add to cart</button>
        </li>
      ))}
      <h2>Cart</h2>
      {cart.map((cartItem) => (
        <li key={cartItem.name}>
          {cartItem.name} - {cartItem.price} - {cartItem.category}
        </li>
      ))}
    </div>
  );
}

export default App;
