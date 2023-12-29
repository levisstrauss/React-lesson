import React, {useState} from 'react';
interface Props {
    items: string[];
    heading: string;
    onSelectItem: (item: string) => void;
}

const ListGroup = ({items, heading, onSelectItem}: Props) => {
    // -1 means nothing is selected
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
