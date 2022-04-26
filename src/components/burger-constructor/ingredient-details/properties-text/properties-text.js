import propertiesStyles from './properties-text.module.css';
import PropTypes from 'prop-types';


function PropertiesText ({name, value}) {

    return (
        <div className={`${propertiesStyles.propertiesMain} mr-5`}>
            <p className="text text_type_main-small text_color_inactive mb-2"> {name} </p>
            <p className="text text_type_digits-default text_color_inactive"> {value} </p>
        </div>
    )
}

PropertiesText.propTypes = {
    name: PropTypes.string,
    value: PropTypes.number
}

export default PropertiesText