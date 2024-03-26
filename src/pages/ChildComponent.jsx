// ChildComponent.js
import React, { useRef, useImperativeHandle } from 'react';


const ChildComponent = React.forwardRef((props, ref) => {
    const handleClick = () => {
        console.log('Button clicked in child component');
    };

    useImperativeHandle(ref, () => ({
        handleClick
    }));

    return (
        <button onClick={handleClick}>Click Me</button>
    );
});

export default ChildComponent;
