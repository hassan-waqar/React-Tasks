import React, { useRef } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
    const childRef = useRef(null);

    const handleButtonClick = () => {
        // Call the handleClick function exposed by the ChildComponent
        childRef.current.handleClick();
    };

    return (
        <div>
            <ChildComponent ref={childRef} />
            <button onClick={handleButtonClick}>Trigger Child Button Click</button>
        </div>
    );
}

export default ParentComponent;
