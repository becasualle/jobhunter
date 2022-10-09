import React from "react";
import { useAppDispatch } from "../app/hooks";
import { toggleSidebar } from "../features/user/userSlice";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

type Props = {};

const NavLinks = (props: Props) => {
  const dispatch = useAppDispatch();
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
            onClick={() => dispatch(toggleSidebar())}
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
