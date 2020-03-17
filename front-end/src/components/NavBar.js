import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [activeItem, setActiveItem] = useState('Home');
  return (
    <Menu size='massive' color='black'>
      <Menu.Item name='Home' active={activeItem === 'Home'} />
      <Menu.Item
        position='right'
        name='Chat Rooms'
        active={activeItem === 'Chat Rooms'}
      />
      <Menu.Item
        position='right'
        name={user ? 'Logout' : 'Login'}
        active={user ? activeItem === 'Logout' : 'Login'}
      />
    </Menu>
  );
};

export default NavBar;
