import React, {useState, useEffect} from 'react';
import Spinner from '../spinner/spinner';

function ItemList({getData,onItemSelected,renderItem }) {
    const [itemList, updateList] = useState([]);

    useEffect(()=>{
        getData()
        .then((data)=>{
           updateList(data)
        })
    }, [])


    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            return (
                <li 
                    key={id}
                    onClick={()=>onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    const content = itemList ? renderItems(itemList) : <Spinner/>

    return (
        <ul>
            {content}
        </ul>
    );
    
}

export default ItemList;