import React from 'react'

const Card = ({ thumbnail, name, desc, active, handleSwitch }) => {
  return (
    <div className='extensionsItem'>
      <div className='itemInfo'>
        <div className='itemImg'>
          <img src={thumbnail} alt='' draggable='false'/>
        </div>
        <div className='itemDesc'>
          <h4>{name}</h4>
          <p>{desc}</p>
        </div>
      </div>
      <div className='itemUtil'>
        <button>Remove</button>
          <label className="switch">
            <input type="checkbox" checked={active} onChange={() => handleSwitch(name)} />
            <span className="slider"></span>
          </label>
      </div>
    </div>
  )
}

export default Card