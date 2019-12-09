import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

/**
 * This component/function handles the way a single pokemon gets displayed for more detail.
 * 
 * @param param pokemon id that is passed in when this function is called by the router.
 */
function Item({ match }) {
  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line
  }, []);

  //define my states
  const [myItem, setItem] = useState({});
  const [myStatsItem, setStatsItem] = useState({});
  const [myTypesItem, setTypesItem] = useState({});

  //make an api call and get the information
  const fetchItem = async () => {
    const fetchItem = await fetch(
      `https://intern-pokedex.myriadapps.com/api/v1/pokemon/${match.params.id}`
    );
    const item = await fetchItem.json();
    //set the states to the different points of information in the api
    setItem(item.data);
    setStatsItem(item.data.stats);
    setTypesItem(item.data.types);
    //testing
    console.log(item);
    console.log(item.data.image);
    console.log(item.data.name);
    console.log(item.data.stats.hp);
  };
  
  /**
   * 
   * @returns two colors based on the type of the pokemon. One for the background, one of the text color.
   */
  let backgroundColor = () => {
    //the different types of pokemon
    const types = [
      'normal',
      'fighting',
      'flying',
      'poison',
      'ground',
      'rock',
      'bug',
      'ghost',
      'steel',
      'fire',
      'grass',
      'water',
      'electric',
      'psychic',
      'ice',
      'dragon',
      'dark',
      'fairy'
    ];
    //a parallel array that gives the color to the type.
    const colors = [
      ['tan', 'black'],
      ['rgb(200, 70, 0)', 'white'],
      ['lightBlue', 'black'],
      ['purple', 'white'],
      ['LemonChiffon', 'black'],
      ['Peru', 'black'],
      ['Olive', 'white'],
      ['darkGray', 'white'],
      ['silver', 'black'],
      ['orangeRed', 'black'],
      ['green', 'white'],
      ['blue', 'white'],
      ['yellow', 'black'],
      ['purple', 'white'],
      ['lightBlue', 'black'],
      ['RoyalBlue', 'black'],
      ['black', 'white'],
      ['pink', 'black']
    ];
    //loop through and choose the two colors.
    for (let i = 0; i < colors.length; i++) {
      //myTypesItem[0] is the first typing of the pokemon being called.
      if (myTypesItem[0] === types[i]) {
        return colors[i];
      }
    }

    return ['white', 'black'];
  };

  /**
   * This method returns the type(s) of the pokemon as a div to be displayed.
   * 
   */
  const types = () => {
    
    if(myTypesItem.length === 1){
      let type = myTypesItem[0];
    return <div style={{color: backgroundColor()[1]}}>Type: {type}</div>;
    }else{
      let type1 = myTypesItem[0];
      let type2 = myTypesItem[1];
      return <div style = {{color: backgroundColor()[1]}}>Types: {type1}, {type2}</div>
    }
  }
  //widthMultiplier lets me change the length of the stats bars with one number.
  let widthMultiplier = 98;
  //handle the different stat bar widths.
  let hpBarWidth = () => {
    let hp = myStatsItem.hp;
    let width = hp/250 * widthMultiplier;
    return width + '%';
  }
  let attackBarWidth = () => {
    let attack = myStatsItem.attack;
    let width = attack/230 * widthMultiplier;
    return width + '%';
  }
  let defenseBarWidth = () => {
    let defense = myStatsItem.defense;
    let width = defense/230 * widthMultiplier;
    return width + '%';
  }
  let specialAttackBarWidth = () => {
    let specialAttack = myStatsItem['special-attack'];
    let width = specialAttack/230 * widthMultiplier;
    return width + '%';
  }
  let specialDefenseBarWidth = () => {
    let specialDefense = myStatsItem['special-defense'];
    let width = specialDefense/230 * widthMultiplier;
    return width + '%';
  }
  let speedBarWidth = () => {
    let speed = myStatsItem.speed;
    let width = speed/230 * widthMultiplier;
    return width + '%';
  }
  let totalBarWidth = () => {
    let total = myStatsItem.hp + myStatsItem.attack + myStatsItem.defense + myStatsItem['special-attack']
                + myStatsItem['special-defense'] + myStatsItem.speed;
    let width = total/720 * widthMultiplier;
    return width + '%';
  }
  let totalStats = () => {
    return myStatsItem.hp + myStatsItem.attack + myStatsItem.defense + myStatsItem['special-attack']
    + myStatsItem['special-defense'] + myStatsItem.speed;
  }
  //give some style to the container. I use the colors that were to be chosen by the backgroundColor method.
  const pokemonContainer = {
    backgroundColor: backgroundColor()[0],
    color: backgroundColor()[1],
    width: '40%',
    margin: '0 auto'
  };
  const background = {
    backgroundColor: 'white',
    padding: '5px'
  };
  const statsContainer = {
    textAlign: 'left',

  };
  //give the stats bars some style.
  const hpBar = {
    backgroundColor: 'rgba(255,255,255,.1)',
    width: hpBarWidth(),
    marginBottom: '5px',

  }
  const attackBar = {
    backgroundColor: 'rgba(255,255,255,.15)',
    width: attackBarWidth(),
    marginBottom: '5px'
  }
  const defenseBar = {
    backgroundColor: 'rgba(255,255,255,.20)',
    width: defenseBarWidth(),
    marginBottom: '5px'
  }
  const specialAttackBar = {
    backgroundColor: 'rgba(255,255,255,.25)',
    width: specialAttackBarWidth(),
    marginBottom: '5px'
  }
  const specialDefenseBar = {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: specialDefenseBarWidth(),
    marginBottom: '5px'
  }
  const speedBar = {
    backgroundColor: 'rgba(255,255,255,.35)',
    width: speedBarWidth(),
    marginBottom: '5px'
  }
  const totalBar = {
    backgroundColor: 'rgba(255,255,255,.4)',
    width: totalBarWidth(),
    marginBottom: '5px'
  }
  const allBars = {
    height: "30px",
    paddingTop: "10px",
    border: "solid black 3px",
    borderRadius: "2%",
    textAlign: 'left'
  }

//return this chunk of jsx to show on screen.
  return (
    <div style={background}>
      <div style={pokemonContainer}>
      <Link style={{ color: backgroundColor()[1]}} to={`/`}>Back</Link>
        <h1>{myItem.name}</h1>
        <h5>{myItem.genus}</h5>
        <p>{types()}</p>
        <img src={myItem.image} 
        alt= {myItem.name} 
        width = "35%"
        height = "35%"
        />
        <div style = {statsContainer}>{/*Use the Object.assign to add more then one style to the divs.*/ }
          <div >HP: <div style = {Object.assign(hpBar, allBars)}>{myStatsItem.hp}</div></div>
          <div >Attack: <div style = {Object.assign(attackBar, allBars)}>{myStatsItem.attack}</div></div>
          <div >Defense: <div style = {Object.assign(defenseBar, allBars)}>{myStatsItem.defense}</div></div>
          <div >Special Attack: <div style = {Object.assign(specialAttackBar, allBars)}>{myStatsItem['special-attack']}</div></div>
          <div >Special Defense: <div style = {Object.assign(specialDefenseBar, allBars)}>{myStatsItem['special-defense']}</div></div>
          <div >Speed: <div style = {Object.assign(speedBar, allBars)}>{myStatsItem.speed}</div></div>
          <div >Total: <div style = {Object.assign(totalBar, allBars)}>{totalStats()}</div></div>
        </div>
        <h5>{myItem.description}</h5>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
          {/*These buttons allow me to go back one pokemon id or go forward on pokemon id. */}
        <button style={{ color: "black"}} onClick={() => window.location.replace(`/${myItem.id-1}`)} > back one </button>
        <button style={{ color: "black"}} onClick={() => window.location.replace(`/${myItem.id+1}`)} > forward one </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
