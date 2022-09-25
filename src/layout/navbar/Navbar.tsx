import React from "react";
import './Navbar.css'
import { NavLink } from "react-router-dom";

const Navbar:React.FC = () => {
   return (
      <div className="sidebar">
         <div className="sidebar__title">Notes App</div>
         <nav>
            <p className="sidebar__category"><NavLink className={({isActive}) => (isActive ? "sidebar__category-link chosen" : "sidebar__category-link")} to='/notes'>All notes</NavLink></p>
            <ul className="sidebar__list">
               <li className="sidebar__item"><NavLink className={({isActive}) => (isActive ? "sidebar__category-link chosen" : "sidebar__category-link")} to='/task'>Task</NavLink></li>
               <li className="sidebar__item"><NavLink className={({isActive}) => (isActive ? "sidebar__category-link chosen" : "sidebar__category-link")} to='/thought'>Random thought</NavLink></li>
               <li className="sidebar__item"><NavLink className={({isActive}) => (isActive ? "sidebar__category-link chosen" : "sidebar__category-link")} to='/idea'>Idea</NavLink></li>
            </ul>
            <p className="sidebar__category"><NavLink className={({isActive}) => (isActive ? "sidebar__category-link chosen" : "sidebar__category-link")} to='/archived-notes'>Archived notes</NavLink></p>
         </nav>
      </div>
   )
}

export default Navbar;