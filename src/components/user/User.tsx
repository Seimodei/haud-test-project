import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

//Redux 
import { StateModel, actions} from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { SingleUserModel } from '../../store/users/usersStateModel';

//Components
import Button from '../button/Button';
import IconButton from '../button/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarker, faAddressBook, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import RotatingBoxesLoader from 'react-loaders-kit/lib/rotatingBoxes/RotatingBoxesLoader';

//Custom hooks
import { useOutsideClick } from '../../utilities/customHooks';

//Styles
import './user.scss';
import Colors from '../../styles/variables.scss';


const User = (props: SingleUserModel) => {
  const dispatch = useDispatch();
  const popUpRef = useRef(null);
  const formatDate = moment(props.dateCreated).format('MMMM Do YYYY');
  const [deletedUserId, setDeletedUserId] = useState('');
  const [openPopUp, setOpenPopUp] = useState(false);

  //Selectors
  const deletingUser = useSelector((state: StateModel) => state.usersState.deletingUser);


  const formatAddress = () => {
    return `${props.address1}, ${props.address2}, ${props.town}, ${props.region}, ${props.postCode}, ${props.country}`;
  }

  const deleteUser = () => {
    setDeletedUserId(props.userId);
    dispatch(actions.users.deleteUserAsync(props.userId));
  }

  const openConfirm = () => {
    setDeletedUserId(props.userId);
    setOpenPopUp(true);
  }

  const closePopUp = () => {
    setOpenPopUp(false);
  }
  useOutsideClick(popUpRef, closePopUp);

  return (
    <div>
      <div className="user">
        <div className="top">
          <span className="name">{props.firstName} {props.lastName}</span>
          <Link to={`/single-user/${props.userId}/${props.firstName}`}>
            <IconButton icon={faMarker} />
          </Link>
        </div>
        <div className="info-group">
          <div className="info-title">
            <FontAwesomeIcon icon={faAddressBook} className="title-icon" />
            <span>Address</span>
          </div>
          <span className="info">{formatAddress()}</span>
        </div>
        <div className="info-group">
          <div className="info-title">
            <FontAwesomeIcon icon={faPhoneAlt} className="title-icon" />
            <span>Contact Number</span>
          </div>
          <span className="info">{props.contactNumber}</span>
        </div>
        <div className="bottom">
          <span className="date">Joined {formatDate}</span>
          { openPopUp && props.userId === deletedUserId ?
            <div className="pop-up" ref={popUpRef}>
              <span className="question">Are you sure want to delete {props.firstName}'s account?</span>
              <span> This is an irreversible action.</span>
              <div className="confirm">
                <span onClick={deleteUser}>Yes</span>
                <span onClick={() => setOpenPopUp(false)}>No</span>
              </div>
            </div> : null
          }
          <Button 
            type="pri" 
            text={`Delete ${props.firstName}'s Account`} 
            onClick={openConfirm}
          />
        </div>
      </div>
      {deletingUser && props.userId ===  deletedUserId?
        <div className="loader-wrapper">
          <RotatingBoxesLoader 
            loading={true} 
            colors={["#fff","#fff",Colors.primary,Colors.primary]} 
            size={25}
          />
        </div> : null
      }
    </div>
  )
}

export default User;