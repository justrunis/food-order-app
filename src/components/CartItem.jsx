import { currencyFormatter } from "../util/formating";
export default function CartItem({
  name,
  quantity,
  price,
  onIncreace,
  onDecreace,
}) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} * {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecreace}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncreace}>+</button>
      </p>
    </li>
  );
}
