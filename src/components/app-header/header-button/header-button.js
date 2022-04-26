import React from 'react';
import buttonStyles from './header-button.module.css';
import PropTypes from 'prop-types';


function HeaderButton({buttonText, icon, active, onClick}) {

    return (
        <div className={buttonStyles.button} onClick={onClick}>
            {icon({type: (active ? "primary" : "secondary")})}
            <p className={`ml-2 text text_type_main-small ${active ? '' : 'text_color_inactive'}`} >{buttonText}</p>
        </div>
    )
}


HeaderButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    active: PropTypes.bool,
    onClick: PropTypes.func
}


export default HeaderButton