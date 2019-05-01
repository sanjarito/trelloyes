import React from 'react';
import Card from './Card'
import './List.css'
import PropTypes from 'prop-types';

function List(props){




  return (
    <section className='List'>
     <header className='List-header'>
       <h2>{props.header}</h2>


     </header>
     <div className='List-cards'>
       {props.cards.map((card,i) =>
         <Card

           listid={props.list_id}
           numero={props.cardsIds}
           key={i}
           id={i}
           title={card.title}
           content={card.content}
           onDeleteClick={props.onDeleteItem}


         />
       )}
       <button
         type='button'
         className='List-add-button'
         onClick={props.onRandomAddItem}
         onClick={() => props.onRandomAddItem(props)}


       >
         + Add Random Card
       </button>
     </div>
</section>
  )
}

export default List
