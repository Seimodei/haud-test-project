import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

//Redux
import { StateModel } from '../../store/store';
import { connect } from 'react-redux';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import { getAllUsersAsync, getSingleUserSuccess, filterAllUsersAsync } from '../../store/users/usersActions';

//Components
import Hero from '../../components/hero/Hero';
import Input from '../../components/input/Input';
import User from '../../components/user/User';

//styles
import './homePage.scss';
import Logo2 from '../../assets/haud-logo-2.png';
import HeroImage from '../../assets/hero.svg';
import Button from '../../components/button/Button';


/* 
  This is a class based component coupled with redux to demonstrate my understanding of 
  legacy react as well as its usage with redux and as per the instructions for
  test completion. This satisfies the requirement to use a class based component for
  general logic
*/

class HomePage extends PureComponent<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>, { search: string }> {
  constructor (props) {
    super(props);

    this.state = {
      search: ''
    };
  }
  
  componentDidMount () {
    this.props.getAllUsersAsync();
    this.props.getSingleUserSuccess({});
  };

  updateSearch = (e) => {
    this.setState({ search: e.target.value });
    this.props.filterAllUsersAsync(e.target.value);
  }


  render () {
    const { search } = this.state;
    const { filteredUsers } = this.props;

    return (
      <div className="home">
        <a href="https://haud.com/" target="_blank" rel="noopener noreferrer" className="logo">
         <img src={Logo2} alt="Haud Systems" />
        </a>
        <Hero
          title="Join Haud Systems Today"
          message="Smart solutions for mobile operators, aggregators and messaging hubs."
          image={HeroImage}
        />
        <div className="info">
          <span className="sub-title">Haud Systems Enterprise</span>
          <p>
            Welcome to Haud Systems database collection of users. You can search
            for a particular user to sign up as a client. Our database is
            constantly updated with new users all the time, so be sure to always
            keep an eye out for new updates
          </p>
        </div>
        <Input
          isIcon
          inputPlaceHolder="Search our extensive database for new users"
          inputValue={search}
          inputOnChange={this.updateSearch}
        />
        <div className="add-user">
          <Link to="/single-user"> 
            <Button type="sec" text="Add New User" />
          </Link>
        </div>
        {filteredUsers && filteredUsers.length > 0 ?
          <div className="all-users">
            {filteredUsers.map((user, index) => {
              return (
                <div key={index}>
                  <User 
                    firstName={user.firstName}
                    lastName={user.lastName}
                    address1={user.address1}
                    address2={user.address2}
                    town={user.town}
                    region={user.region}
                    country={user.country}
                    postCode={user.postCode}
                    contactNumber={user.contactNumber}
                    dateCreated={user.dateCreated}
                    userId={user.userId}
                  />
                </div>
              )
            })}
          </div> : 
          <div className="empty">
            No Users Found
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state: StateModel) => ({
  allUsers: state.usersState.allUsers,
  filteredUsers: state.usersState.filteredUsers
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => 
  bindActionCreators({
    getAllUsersAsync,
    getSingleUserSuccess,
    filterAllUsersAsync
  }, dispatch);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(HomePage);
