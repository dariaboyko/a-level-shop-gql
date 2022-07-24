import { NavLink } from "react-router-dom";
import "./NavigationCategory.css";
import Cart from "./Cart";
function NavigationCategory({ valueCurrency }) {
  return (
    <nav className="navigation">
      <ul className="navigation--list">
        <li>
          <NavLink
            to="/all"
            className={({ isActive }) =>
              isActive
                ? "navigation--list--link__selected"
                : "navigation--list--link"
            }
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/samsung"
            className={({ isActive }) =>
              isActive
                ? "navigation--list--link__selected"
                : "navigation--list--link"
            }
          >
            Samsung
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/iphone"
            className={({ isActive }) =>
              isActive
                ? "navigation--list--link__selected"
                : "navigation--list--link"
            }
          >
            iPhone
          </NavLink>
        </li>
      </ul>
      <Cart valueCurrency={valueCurrency} />
    </nav>
  );
}
export default NavigationCategory;
