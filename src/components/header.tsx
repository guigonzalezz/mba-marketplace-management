import { Link } from "react-router-dom";

import chartHistogramIcon from "../assets/icons/chart-histogram.svg";
import packageIcon from "../assets/icons/package.svg";
import plusSignIcon from "../assets/icons/plus-sign.svg";
import logoImage from "../assets/images/logo.svg";
import { AccountMenu } from "./accountMenu";
import { NavLink } from "./common/navLink";

export function Header() {
  return (
    <div className="flex h-20 items-center justify-between border-b border-shape">
      <div className="p-5">
        <img src={logoImage} className="h-10 w-14" alt="Logo" />
      </div>
      <nav className="flex gap-2">
        <NavLink to="/">
          <img src={chartHistogramIcon} className="h-5 w-5" alt="Chart icon" />
          Dashboard
        </NavLink>
        <NavLink to="/products">
          <img src={packageIcon} className="h-5 w-5" alt="Package icon" />
          Products
        </NavLink>
      </nav>
      <div className="flex items-center gap-4 pr-5">
        <Link to="/products/add">
          <button className="flex h-10 w-full items-center justify-between gap-2 rounded-[.625rem] bg-orange-base px-4 text-white transition-colors duration-200 hover:bg-orange-dark">
            <img
              src={plusSignIcon}
              className="h-5 w-5"
              alt="Math addition sign"
            />
            <span className="action-sm">New Product</span>
          </button>
        </Link>
        <AccountMenu />
      </div>
    </div>
  );
}
