import { useEffect } from 'react';

/*
  This file contains a custom hook that enables the user dismiss the
  delete pop-up when they click on anywhere outside the component. This
  satisfies the test requirement to use a custom hook
*/

export const useOutsideClick = (ref, callback: any) => {
  useEffect(() => {
    /**
     * Close pop-up when a user clicks outside the component
     */
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}