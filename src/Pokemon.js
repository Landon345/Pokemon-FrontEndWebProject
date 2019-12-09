import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function Pokemon() {
  useEffect(() => {
    fetchItems();
  }, []);
//define the states
  const [items, setItems] = useState([]);
  const [itemNames, setItemNames] = useState([]);
//call the api to retrieve the data
  const fetchItems = async () => {
    //I retrieve the list of pokemon
    const data = await fetch(
      `https://intern-pokedex.myriadapps.com/api/v1/pokemon`
    );
    const item = await data.json();
    //put the data into the states
    setItems(item.data);
    setItemNames(item.data)
  };

  //create a grid template for the list of pokemon
  const container = {
    color: "black",
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    gridGap: '10px'
  };

  const pokemonObject = {
    color: 'black',
    border: 'solid blue 5px',
    height: '100px',

    
  };

  /**
   * It fillters out pokemon that don't have the same starting name text as the textbox.
   * @param {*} e the event e.target.value gives the text in the textbox.
   */
  const handleChange = (e) => {
    
     setItemNames(items.filter((item)=>{
      return item.name.toLowerCase().startsWith(e.target.value.toLowerCase());
     }));
     
  }

  return (
    <div>
      <h1>Pokemon Page</h1>
      <input type = 'text' placeholder='search' onChange = {handleChange}></input>
      
      <div style = {container}>
        {/*map through the pokemon and display them on screen a certain way.
        Link is there to allow me to click on a name and bring it to more detail. */}
      {itemNames.map(item => (
        <p key={item.id} style = {pokemonObject}>
          <Link to={`/${item.id}`}  >{item.name}</Link>
          <img src={item.image} 
        alt= {item.name} ></img>
        </p>
      ))}
      </div>
    </div>
  );
}

export default Pokemon;
