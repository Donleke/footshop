import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { initialState, AuthReducer } from "../reducers/authReducer";
import { instance } from "./baseURL";
import toast from "react-hot-toast";

export const StateContext = createContext();
let initialCartState = [];
let shippingData = {};
let paymentData = "";

export const StateProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);
  const [cartItems, setCartItems] = useState(initialCartState);
  const [shippingDetails, setShippingDetails] = useState(shippingData);
  const [paymentMethod, setPaymentMethod] = useState(paymentData);

  //get user from local storage
  let currentUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : "";

  //reducer actions
  const loginUser = async (name, password) => {
    try {
      dispatch({ type: "REQUEST_LOGIN" });
      const res = await instance.post("/api/auth/login", { name, password });
      if (res) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        toast.success("login successful");
        localStorage.setItem("currentUser", JSON.stringify(res.data));
      }
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR", payload: { error: error } });
      toast.error("Invalid username or password");
    }
  };
  const registerUser = async (name, email, password) => {
    try {
      dispatch({ type: "REQUEST_REGISTER" });
      const res = await instance.post("/api/auth/register", {
        name,
        email,
        password,
      });
      if (res) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        toast.success("Registration successful");
        localStorage.setItem("currentUser", JSON.stringify(res.data));
      }
    } catch (error) {
      dispatch({ type: "REGISTER_ERROR", payload: { error: error } });
      toast.error("Registration failed");
      console.log(error);
    }
  };

  const logout = async () => {
    localStorage.removeItem("currentUser");
    dispatch({ type: "LOGOUT" });
    document.location.href = "/account";
  };

  //cart actions
  //save cart to localstoroage
  useEffect(() => {
    const inCart = JSON.parse(localStorage.getItem("updatedCart"));
    if (inCart) {
      setCartItems(inCart);
    }
  }, []);

  useEffect(() => {
    if (cartItems !== initialCartState) {
      localStorage.setItem("updatedCart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  //add items to cart
  const addToCart = (productId) => {
    if (cartItems.find((p) => p._id === productId._id)) {
      setCartItems((cart) =>
        cart.map((cartItem) =>
          cartItem._id === productId._id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
      return;
    }
    setCartItems((cart) => [...cart, { ...productId, quantity: 1 }]);
    toast.success(`${productId.title} added to cart `);
  };

  //show cart quantity
  const cartQuantity = cartItems?.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  //update cart quantity
  const updateCart = (id, d) => {
    setCartItems((cart) =>
      cart.flatMap((cartItem) =>
        cartItem._id === id
          ? cartItem.quantity + d < 1
            ? []
            : [
                {
                  ...cartItem,
                  quantity: cartItem.quantity + d,
                },
              ]
          : [cartItem]
      )
    );
  };

  //delete items in cart
  const removeFromCart = (id) => {
    setCartItems((cart) => cart.filter((item) => item._id !== id));
  };
  //get cart total
  const priceSum = cartItems
    .reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2);

  //get shippingdetails
  useEffect(() => {
    const shipForm = JSON.parse(localStorage.getItem("shippingDetails"));
    if (shipForm) {
      setShippingDetails(shipForm);
    }
  }, []);

  useEffect(() => {
    if (shippingDetails !== shippingData) {
      localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails));
    }
  }, [shippingDetails]);

  //get payment method
  useEffect(() => {
    const paymentType = JSON.parse(localStorage.getItem("paymentType"));
    if (paymentType) {
      setPaymentMethod(paymentType);
    }
  }, []);

  useEffect(() => {
    if (paymentMethod !== paymentData) {
      localStorage.setItem("paymentType", JSON.stringify(paymentMethod));
    }
  }, [paymentMethod]);

  //order checkout details
  const round2 = (num) =>
    (Math.round(num * 100 + Number.EPSILON) / 100).toFixed(2);
  const shippingPrice = round2(priceSum > 700 ? 0 : 20);
  const taxPrice = round2(Number((priceSum * 0.015).toFixed(2)));
  const totalPrice = (
    Number(priceSum) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  //reset order
  const resetOrder = () => {
    setCartItems([]);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        currentUser,
        loginUser,
        registerUser,
        logout,
        cartQuantity,
        cartItems,
        updateCart,
        removeFromCart,
        addToCart,
        priceSum,
        setShippingDetails,
        shippingDetails,
        paymentMethod,
        setPaymentMethod,
        shippingPrice,
        taxPrice,
        totalPrice,
        resetOrder,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
