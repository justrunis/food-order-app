import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formating";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleCloseCart() {
    userProgressContext.hideCart();
  }

  function handleGoToCheckout() {
    userProgressContext.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressContext.progress === "cart"}
      onClose={userProgressContext.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id}>
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncreace={() => cartCtx.addItem(item)}
              onDecreace={() => cartCtx.removeItem(item.id)}
            />
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
