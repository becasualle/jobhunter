import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

type Props = {
  toggleSidebar?: () => void;
};

const NavLinks = ({ toggleSidebar }: Props) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, icon, path, text } = link;

        return (
          <NavLink
            end
            to={path}
            key={id}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={toggleSidebar}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
