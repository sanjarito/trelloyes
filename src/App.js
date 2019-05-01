import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE'


function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };


  constructor(props){
  console.log('props in constructor', props)
  super(props)
   this.state = {
      store: STORE
    }

}
//event handler methods for the callback props


handleDeleteItem = (props) => {
  const { lists, allCards } = this.state.store;
  const newLists = lists.map(list => {
    list.cardIds = list.cardIds.filter(id => id !== props.numero[props.id]);
    return list;
  });
    delete allCards[props.numero[props.id]];

      this.setState({
      store:{
        lists:newLists,
        allCards:allCards
      }
    })
  }


handleRandomAddItem = (props) => {
  console.log('handle add Random item called')
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);

    const { lists, allCards } = this.state.store;

    let new_item = {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }


    const newLists = lists.map(list => {
      if (list.id === props.list_id) {
	       return {
          ...list,
          cardIds: [...list.cardIds, new_item.id]
        };

      }

      return list;
    })
    console.log(new_item)
    console.log(newLists)

    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [new_item.id]: new_item
        }
      }
    })









}


  render() {
    const { store } = this.state



    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (

            <List

              // card_id ={list.cardIds.map(id => store.cardIds[id])}
              cardsIds = {list.cardIds}

              list_id={list.id}
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onDeleteItem={this.handleDeleteItem}
              onRandomAddItem={this.handleRandomAddItem}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
