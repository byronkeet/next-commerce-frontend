import React, { useContext, createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	const onAdd = (product, quantity) => {
		const checkProductInCart = cartItems.find((item) => item._id === product._id);

		setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);

		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((cartItem) => {
				if (cartItem._id === product._id) return {
					...cartItem,
					quantity: cartItem.quantity + quantity
				}
				return cartItem;
			})

			setCartItems(updatedCartItems);
		} else {
			product.quantity = quantity;
			setCartItems([...cartItems, { ...product }]);
		}

		toast.success(`${qty} ${product.name} added to cart.`);
	}

	const onRemove = (product) => {
		const foundProduct = cartItems.find((cartItem) => cartItem._id === product._id);
		const newCartItems = cartItems.filter((cartItem) => cartItem._id !== product._id);

		setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);

		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);

		setCartItems(newCartItems);
	}

	const toggleCartItemQuanitity = (id, value) => {
		const foundProduct = cartItems.find((cartItem) => cartItem._id === id);

		let updatedCartItems;

		if (value === 'inc') {
			updatedCartItems = cartItems.map((cartItem) => {
			
				if (cartItem._id === id ) {
					return { ...cartItem, quantity: cartItem.quantity + 1 } 
				} else {
					return cartItem;
				}
			
			});
			setCartItems(updatedCartItems);
			setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
			setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
		} else if (value === 'dec') {
			if ( foundProduct.quantity == 0 ) return;
			updatedCartItems = cartItems.map((cartItem) => {
			
				if (cartItem._id === id ) {
					return { ...cartItem, quantity: cartItem.quantity - 1  }
				} else {
					return cartItem;
				}
			
			});
			setCartItems(updatedCartItems);
			setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
			setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
		}
	}

	const incQty = () => {
		setQty((prevQty) => prevQty + 1);
	}

	const decQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 < 1) return 1;
			return prevQty - 1;
		});
	}

	return (
		<Context.Provider
			value={{
				showCart,
				setShowCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				incQty,
				decQty,
				onAdd,
				toggleCartItemQuanitity,
				onRemove,
				setCartItems,
				setTotalPrice,
				setTotalQuantities 
			}}
		>
			{children}
		</Context.Provider>
	)
}

export const useStateContext = () => useContext(Context);