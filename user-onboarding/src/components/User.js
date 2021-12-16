import React from 'react';

function User({ details }) {
    if (!details) {
        return <h3>Reticulating Splines.....</h3>
    }

    return (
        <div className='member container'>
            <h3>{details.first_name}{" "}{details.last_name}</h3>
            <p>{details.email}</p>
            {/* <img src={details.avatar}/> */}
        </div>
    )
}

export default User;