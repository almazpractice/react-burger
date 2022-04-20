import React from 'react';
import buttonStyles from './header-button.module.css'

class HeaderButton extends React.Component {
    state = {
        isActive: false,
    }

    onClickActivate = () => {
        this.setState({ isActive: !this.state.isActive})
    }

    render() {
        return (
            <div className={buttonStyles.button} onClick={this.onClickActivate}>
                {this.props.icon({type: (this.state.isActive ? "primary" : "secondary")})}
                <p className={`ml-2 text text_type_main-small ${this.state.isActive ? '' : 'text_color_inactive'}`} >{this.props.buttonText}</p>
            </div>
        )
    }
}

export default HeaderButton