### React learning lesson!
    - Environment setup:
    - Install Node.js
    - Install React via vite: npm init vite@latest
### building component in React
    - Building component
    - Rendering markup with jsx
    - Managing state with useState hook
    - Passing input via props
    - Debugging React with React DevTools
   
    ------ Installations ------
    - Bootstrap: npm install bootstrap
    - import Bootstrap in main.tsx: import 'bootstrap/dist/css/bootstrap.css';
---
### The power of the map() function
    - The map function is a function that takes an array and transforms it into another array.
    - The map function takes a callback function as an argument.
    - The callback function takes an argument, which is the current item in the array.
    - The callback function returns the transformed item.
    - The map function returns a new array with the transformed items.
----- Codes -----
```javascript
// An array of States
     const items = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
];
// The map function takes a callback function as an argument.
// The key allows React to keep track of the elements in the list.

<ul className="list-group">
    {items.map((item) => (
        <li key={item} className="list-group-item">{item}</li>
    ))}
</ul>
```
### Conditional rendering 
    - Conditional rendering is a term used to describe the ability to render different 
      user interface (UI) markup if a condition is true or false.
    - Conditional rendering is useful when you want to render different UI 
      markup depending on whether the user is logged in or not.
    - Conditional rendering is also useful when you want to render 
      different UI markup depending on the state of the component.

---- Codes -----
```javascript
// An array of States
     const items = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
];
// The map function takes a callback function as an argument.
// The key allows React to keep track of the elements in the list.
{items.length === 0 && <p>No item found</p>}
<ul className="list-group">
    {items.map((item) => (
        <li key={item} className="list-group-item">{item}</li>
    ))}
</ul>
```
### Click events handler in React
    - The onClick event is fired when a user clicks on an element.
    - map() function also returns the index of the element in the array.
    - onClick event handler takes an event object as an argument.
```javascript
  <ul className="list-group">
    {items.map((item, index) => (
        <li
            key={item}
            className="list-group-item"
            onClick={(e) => console.log(item, index)}
            onClick={(e) => console.log(item, index)} // Access all the element of event
            onClick={handleItemClick} // passing the reference of the function
        >
            {item}
        </li>
    ))}
 </ul>

// handleItemClick function: dont forget to use type anotation
import {MouseEvent} from "react"; // just hover the element to see the type
const handleItemClick = (e) => {
    console.log(e.target.innerText);
};
```
### Managing State in React: useState hook
    - The useState hook is a function that takes an initial state as an argument and returns an array of two items.
    - The first item is the current state value.
    - The second item is a function that allows you to update the state value.
---- Codes -----
```javascript
// useState hook
import {useState} from "react";
const [selectedIndex, setSelectedIndex] = useState(-1); // -1 means nothing is selected
<ul className="list-group">
    {items.map((item, index) => (
        <li
            key={item}
            // Conditional rendering the active class
            className={selectedIndex === index ? 'list-group-item active' : 'list-group-item'}
            // Setting the state
            onClick={(e) => setSelectedIndex(index)}
        >
            {item}
        </li>
    ))}
</ul>
```
### Passing input via props
    - Props are used to pass data from a parent component to a child component.
    - Passing Props can be very confusing at first but it's very simple.
```javascript
// First we have our coomponent ListGroup and we know that the component will 
// receive an array of items and heading as props from the parent component. App.tsx
// We use an interface to define the type of the props that the component will receive.

// App.tsx component
function App() {
  const items = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
  ];
  return ( // rendring the component with the different props
    <ListGroup items={items} heading="Cities" />
  )
}

export default App

------------------------------------------

// GroupList.tsx component
// We use an interface to define the type of the props that the component will receive.
import React, {useState} from 'react';
interface Props {
    items: string[];
    heading: string;
}
// Desctructuring the props directly in the function signature
const ListGroup = ({items, heading}: Props) => {
    // Dont forget this is jusst a state 
    const [selectedIndex, setSelectedIndex] = useState(-1); 
    return (
       <>
         <h1>{heading}</h1> // Rendering the heading
          <ul className="list-group">
            // Mapping over the items props
             {items.map((item, index) => (
               <li
                  key={item}
                    className={selectedIndex === index ? 
                        'list-group-item active' : 'list-group-item'}
                    onClick={(e) => setSelectedIndex(index)}
                  >
                  {item}
               </li>
             ))}
          </ul>
       </>
    );
};

export default ListGroup;
```
### Passing function as Props
    - Same as passing data as props, passing function as props is very simple.
    - It all depends on how we structure the logic of our application.
    - implementting the function in the ListGroup.tsx component will not make the component reusable.
```javascript
// App.tsx component we define all the logic here and pass them as props to the child component
function App() {
  // Data
  const items = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
  ];
  // The function we are passing as props to notify the parent component if something is 
  // selected in the child component
  const handleSelection = (item: string) => {
      console.log(`You selected ${item}`); // The function will be executed!
  }
  return (
     // As other props we pass the function as props to the child component
    <ListGroup items={items} heading="Cities" onSelectItem={handleSelection}/> 
      // it will be notified when something is selected and trigger the function
  )
}
export default App

------------------------------------------
// GroupList.tsx 
import React, {useState} from 'react';

interface Props {
    items: string[];
    heading: string;
    onSelectItem: (item: string) => void; // Define the type of the function we are passing
}
// Destrucuring the props directly in the function signature
const ListGroup = ({items, heading, onSelectItem}: Props) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    return (
        <>
            <h1>{heading}</h1>
            <ul className="list-group">
                {items.map((item, index) => (
                    <li
                        key={item}
                        className={selectedIndex === index ?
                            'list-group-item active' : 'list-group-item'}
                        // In the onClick event we call the function by passing the clicked item
                        onClick={(e) => {
                            setSelectedIndex(index);
                            onSelectItem(item);
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ListGroup;
```
### Difference between Props and State:
    - Props: input data passed to a component simular to function arguments (immutable)
    - State: Data managed by a component simular to local variables declared in a function (mutable)
### Passing Children via Props
    - Passing children via props is very simple.
    - Props is passed to the component by: <Component name="value" />
    - Children is passed to the component by: <Component>Children</Component>

```javascript
// App.tsx parent component
import React from 'react'
import Alert from "./components/Alert";
function App() {
    return (
        <div>
            <Alert>
                Hello World  // The way we pass the children
            </Alert>
        </div>
    )
}
export default App


import React, {ReactNode} from 'react';
interface Props {
    children: ReactNode;   // look at the way we define the type of the children
}
const Alert = ({children}: Props) => {
    return (
        <div className="alert alert-primary"> // The way we render it
            {children}  // The way we structure it in the component
        </div>
    );
};
export default Alert;
```
### Use React DevTools to debug React 

### Assignment 
```javascript

import React, {ReactNode} from 'react';
interface Props {
    children: ReactNode;
    onClose: () => void;
}
const Alert = ({children, onClose}: Props) => {
    return (
        <div className="alert alert-primary alert-dismissible">
            {children}
            <button type="button" className="btn-close" onClick={onClose} data-bs-dismiss="alert">&times;</button>
        </div>
    );
};
export default Alert;

import React, {useState} from 'react'
import Alert from "./components/Alert";
import Button from "./components/Button";
function App() {

  const [alertVisible, setAlertVisible] = useState(false)

  return (
    <div>

        {alertVisible &&
          <Alert onClose={() => setAlertVisible(false)}>
             My alert
          </Alert>
        }
        <Button color="success" onClick={() => setAlertVisible(true)}>My button</Button>
    </div>
  )
}

export default App

import React from 'react';

interface Props {
    children: string;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    onClick: () => void;
}

const Button = ({children, onClick, color}: Props) => {
    return (
        <button
            className={"btn btn-" + color}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
export default Button;
```



