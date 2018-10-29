import React from 'react';
import ListUnit from './ListUnit';

const ListPlaces = ({venues, handleListUnitClick}) => {
    return (
        <ol className="ListPlaces">
            {venues && 
                venues.map((venue, idx) => (
                    <ListUnit 
                        key={idx} 
                        venue={venue} 
                        handleListUnitClick={handleListUnitClick}
                    />
                )
            )}
        </ol>         
    );
}

export default ListPlaces;
