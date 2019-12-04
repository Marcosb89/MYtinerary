import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Log = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(prevState => !prevState);
	if(!localStorage){			
		return(
			<div>
				<Dropdown isOpen={dropdownOpen} toggle={toggle}>
					<DropdownToggle color='none'>
						<img id='profile' src={require("../assets/images/profile.jpg")} alt="profile" />
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem>
							<Link to="/createAccount" className="link">Create account</Link>
						</DropdownItem>
						<DropdownItem>
							<Link to="/login" className="link">Login</Link>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		)
	}else{
		return(
			<div>
				<Dropdown isOpen={dropdownOpen} toggle={toggle}>
					<DropdownToggle color='none'>
							<img id='profile' src={require("../assets/images/profile.jpg")} alt="profile" />
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem>
							<Link to="/logout" className="link">Logout</Link>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		)
	}
}

const User = (props) => {
  return (
		<div className='User'>
			<Log />
		</div>
  );
}

const Menu = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
		<div className='Menu'>
			<Dropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle color='none'>
					<div id='bar1'></div>
					<div id='bar2'></div>
					<div id='bar3'></div>
					</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem>
						<Link to="/" className="link">Home</Link>
					</DropdownItem>
					<DropdownItem>
						<Link to="/mytinerary" className="link">MYtinerary</Link>
					</DropdownItem>
					<DropdownItem>
						<Link to="/cities" className="link">Cities</Link>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
  );
}

class Toolbar extends React.Component {
	render(){
		return (
			<div className='Toolbar'>
				<User />
				<Menu />
			</div>
		)
	}
}

export default Toolbar;