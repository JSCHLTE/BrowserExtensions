import { useEffect, useState } from 'react'
import Card from './Card'
import './css/base.css'
import './css/variables.css'
import './css/app.css'
import './css/card.css'
import data from  '../data.json'

function App() {

  const [extensions, setExtensions] = useState(() => {
    const localExtensions = localStorage.getItem('extensions');
    return localExtensions ? JSON.parse(localExtensions) : data 
  });
  const [lightMode, setLightMode] = useState(() => {
    const localTheme = localStorage.getItem('theme')
    return localTheme ? JSON.parse(localTheme) : false
  });

  const [all, setAll] = useState(true);
  const [active, setActive] = useState(false);
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    localStorage.setItem('extensions', JSON.stringify(extensions));
  }, [extensions]);

  useEffect(() => {
    lightMode ? document.body.classList.add('lightMode') : document.body.classList.remove('lightMode');
    localStorage.setItem('theme', JSON.stringify(lightMode));
  }, [lightMode]);

  const handleFilter = (param) => {
    setAll(param === 'All');
    setActive(param === 'Active');
    setInactive(param === 'Inactive');
  };

  const handleTheme = () => {
    setLightMode(prevTheme => (!prevTheme));
  }
  

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
            <div className={`logo ${lightMode ? '' : 'invert'}`}>
              <img src='images/logo.svg' alt='Extensions Logo' draggable='false'/>
            </div>
            <div className='themeToggle' onClick={handleTheme} tabIndex={0}>
            <img src={lightMode ? 'images/icon-moon.svg' : 'images/icon-sun.svg'} alt='Extensions Logo' draggable='false' />
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
