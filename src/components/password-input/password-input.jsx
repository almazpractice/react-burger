import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

export const PasswordInput = ({ type, ...props }) => {
    const [isVisible, setVisible] = useState(false);
    return (
        <Input
            {...props}
            type={isVisible ? 'text' : 'password'}
            icon={isVisible ? "HideIcon" : "ShowIcon"}
            onIconClick={() => setVisible(!isVisible)}
        />
    );
}