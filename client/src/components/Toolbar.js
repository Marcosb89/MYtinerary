import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
var empty = require('is-empty');


class Toolbar extends React.Component {
	render(){
		const User = () => {
			const Log = () => {
				const [dropdownOpen, setDropdownOpen] = useState(false);
				const toggle = () => setDropdownOpen(prevState => !prevState);	
				if(empty(this.props.auth.user)){
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
										<Link to="/login" className="link" >Login</Link>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					)
				}else{
					const userDecoded = jwt_decode(this.props.auth.user);
					const imgProfile = userDecoded.urlPic;

					const logOut = (e) => {
						e.preventDefault()
						localStorage.setItem('persist:root', '')
							alert("You've logged out");
							window.location.reload();
						/*if (userDecoded.google === false){
							//set props to empty and refresh to apply changes
							localStorage.setItem('persist:root', '')
							alert("You've logged out");
							window.location.reload();
						}else{
							alert("Google Logout");
							//window.location.href = "https://mail.google.com/mail/u/0/?logout&hl=en";
						}*/
					}	
					return(
						<div>
							<Dropdown isOpen={dropdownOpen} toggle={toggle}>
								<DropdownToggle color='none'>
									<img id='profileImg' src={imgProfile} alt="profile" />
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem>
										<Link to="/" onClick={logOut.bind(this)}>Logout</Link>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					)
				}
			}
			return (
				<div className='User'>
					<Log/>
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
		return (
			<div className='Toolbar'>
				<User />
				<Menu />
			</div>
		)
	}
}

//-----
//REDUX
//-----
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, null)(Toolbar);