import {useState } from 'react';

export const useVisible = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }
  return [isVisible, toggleVisibility];
};

export default useVisible;