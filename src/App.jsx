import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Card from './Card'
import './css/base.css'
import './css/variables.css'
import './css/app.css'
import './css/card.css'
import data from  '../data.json'

function App() {

  const [extensions, setExtensions] = useState(data);
  const [all, setAll] = useState(true);
  const [active, setActive] = useState(false);
  const [inactive, setInactive] = useState(false);

  const handleFilter = (param) => {
    setAll(param === 'All');
    setActive(param === 'Active');
    setInactive(param === 'Inactive');
  };
  

  const handleSwitch = (name) => {
    setExtensions((prevState) => 
      prevState.map((item) => (item.name == name ? {
        ...item,
        isActive: !item.isActive
      } : item ))
    );
  }

  return (
    <main>
      <div className='innerWrapper'>
        <div className='titleBar'>
            <div className='logo'>
              <img src='BrowserExtensions/src/assets/images/logo.svg' alt='Extensions Logo' draggable='false'/>
            </div>
            <div className='themeToggle'>
            <img src='BrowserExtensions/src/assets/images/icon-sun.svg' alt='Extensions Logo' draggable='false' />
            </div>
          </div>

          <div className='extensionsWrapper'>
            <div className='extensionsTitle'>
              <h1>Extensions List</h1>
            </div>
            <div className='extensionsFilter'>
              <button className={all ? 'selected' : ''} onClick={() => handleFilter('All')}>All</button>
              <button className={active ? 'selected' : ''} onClick={() => handleFilter('Active')}>Active</button>
              <button className={inactive ? 'selected' : ''} onClick={() => handleFilter('Inactive')}>Inactive</button>
            </div>
          </div>

          <div className='extensionsItems'>
            {
              all ? extensions.map((item) => (
                <Card thumbnail={item.logo} name={item.name} desc={item.description} active={item.isActive} handleSwitch={handleSwitch} key={item.name}/>
              )) : ''
            }

{
              active ? extensions.filter((item) => item.isActive === true).map((item) => (
                <Card thumbnail={item.logo} name={item.name} desc={item.description} active={item.isActive} handleSwitch={handleSwitch} key={item.name}/>
              )) : ``
            }

{
              inactive ? extensions.filter((item) => item.isActive === false).map((item) => (
                <Card thumbnail={item.logo} name={item.name} desc={item.description} active={item.isActive} handleSwitch={handleSwitch} key={item.name}/>
              )) : ''
            }
          </div>
      </div>
    </main>
  )
}

export default App
