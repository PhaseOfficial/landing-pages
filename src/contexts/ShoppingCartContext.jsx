import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ShoppingCartContext = createContext();

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = localStorage.getItem('shoppingCart');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Error parsing local storage cart:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const getItemQuantity = (id) => {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  };

  const addItem = (item) => {
    setCartItems(currItems => {
      // Check if item already exists in cart based on its uniqueId (from StorePage)
      const existingItem = currItems.find(cartItem => cartItem.uniqueId === item.uniqueId);

      if (existingItem) {
        // If it exists, update its quantity
        return currItems.map(cartItem => {
          if (cartItem.uniqueId === item.uniqueId) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
      } else {
        // If it's a new item, add it with quantity 1 and a unique cart itemId
        return [...currItems, { ...item, id: uuidv4(), quantity: 1 }];
      }
    });
  };
  
  const removeItem = (id) => {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id);
    });
  };

  const increaseQuantity = (id) => {
    setCartItems(currItems => {
      return currItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decreaseQuantity = (id) => {
    setCartItems(currItems => {
      const item = currItems.find(item => item.id === id);
      if (item.quantity === 1) {
        return currItems.filter(item => item.id !== id);
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const cartTotal = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price);
    return total + (isNaN(itemPrice) ? 0 : itemPrice * item.quantity);
  }, 0);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        getItemQuantity,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartQuantity,
        cartTotal,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
