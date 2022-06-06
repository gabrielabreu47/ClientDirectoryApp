import { useState } from 'react';
export const useToggle = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return [isOpen, toggle];
};
