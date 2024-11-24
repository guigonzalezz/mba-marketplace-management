import { NavLink as DefaultNavLink, NavLinkProps } from "react-router-dom";

export function NavLink(props: NavLinkProps) {
  return (
    <DefaultNavLink
      className={({ isActive }) => `        
        flex h-10 items-center gap-2 rounded-[10px] px-4
        ${
          isActive
            ? "action-sm pointer-events-none bg-shape text-orange-base"
            : "body-sm text-gray-300 hover:text-orange-dark"
        }
      `}
      {...props}
    />
  );
}
