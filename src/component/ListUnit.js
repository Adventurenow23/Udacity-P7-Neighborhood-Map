import React from 'react';



//Delivers specific name and icon to sidebar menu//
const ListUnit = ({venue, handleListUnitClick}) => {
    return (
        <li className = "listUnit"
        aria-label = "ListUnit"
        tabIndex = "0"
            onClick={() => 
                handleListUnitClick(venue)
            }
        >    
        <img src = {venue.categories[0].icon.prefix+"32"+ venue.categories[0].icon.suffix} 
             alt = {venue.categories[0].name} role="presentation"
        />
            {venue.name}   
        </li>
    );
}

export default ListUnit;