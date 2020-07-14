import React, { useState ,useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

//Redux
import {StateModel, actions} from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

//Components
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import RotatingBoxesLoader from 'react-loaders-kit/lib/rotatingBoxes/RotatingBoxesLoader';

//Helpers
import { 
  updateUserDetailsUrl, 
  updateUserDetailsObj,
  validateText,
  validatePhone,
  errorMessages
} from '../../utilities/utilities';

//styles
import './userPage.scss';
import Logo2 from '../../assets/haud-logo-2.png';
import Colors from '../../styles/variables.scss';


/*
  This is a functional component using the new react hooks for component state
  management as well as using the redux support for hooks as well. It makes code
  legible and readable as well as a very seamless integration. 
*/

const UserPage = () => {
  const { id, name } = useParams();
  const dispatch = useDispatch();

  const [firstName, updateFirstName] = useState('');
  const [lastName, updateLastName] = useState('');
  const [address1, updateAddress1] = useState('');
  const [address2, updateAddress2] = useState('');
  const [town, updateTown] = useState('');
  const [region, updateRegion] = useState('');
  const [postCode, updatePostCode] = useState('');
  const [country, updateCountry] = useState('');
  const [telephone, updateTelephone] = useState('');
  const [fieldNumber, setFieldNumber] = useState(null);
  const [dateCreated, setDateCreated] = useState('');
  const [errorField, setErrorField] = useState(0);

  //Selectors
  const singleUser = useSelector((state: StateModel) => state.usersState.singleUser);
  const addingNewUser = useSelector((state: StateModel) => state.usersState.addingNewUser);
  const updatingUser = useSelector((state: StateModel) => state.usersState.updatingUser);


  const updateUserDetails = () => {
    const updateUrl = updateUserDetailsUrl(id);
    const updateObj = updateUserDetailsObj(firstName, lastName, address1, address2, town, region, postCode, country, telephone, id, dateCreated);
    const newUserObj = updateUserDetailsObj(firstName, lastName, address1, address2, town, region, postCode, country, telephone, uuidv4(), moment().toISOString());

    if (id !== undefined) {
      dispatch(actions.users.updateUserDetailsAsync(updateUrl, updateObj));
    } else {
      dispatch(actions.users.createNewUserAsync(newUserObj));
    }
  }

  const submitDetails = () => {
    if (validateText(firstName).error) {
      setErrorField(1);
    } else if (validateText(lastName).error) {
      setErrorField(2);
    } else if (validateText(address1).error) {
      setErrorField(3);
    } else if (validateText(address2).error) {
      setErrorField(4);
    } else if (validateText(town).error) {
      setErrorField(5);
    } else if (validateText(region).error) {
      setErrorField(6);
    } else if (validateText(postCode).error) {
      setErrorField(7);
    } else if (validateText(country).error) {
      setErrorField(8);
    } else if (validatePhone(telephone).error) {
      setErrorField(9);
    } else {
      updateUserDetails();
    }
  }

  const validateField = (targetField: number) => {
    setFieldNumber(targetField);
  }


  useEffect(() => {
    if(singleUser) {
      updateFirstName(singleUser.firstName);
      updateLastName(singleUser.lastName);
      updateAddress1(singleUser.address1);
      updateAddress2(singleUser.address2);
      updateTown(singleUser.town);
      updateRegion(singleUser.region);
      updatePostCode(singleUser.postCode);
      updateCountry(singleUser.country);
      updateTelephone(singleUser.contactNumber);
      setDateCreated(singleUser.dateCreated);
    }
  }, [singleUser])

  useEffect(() => {
    if (id !== undefined) {
      dispatch(actions.users.getSingleUserAsync(id));
    }
  }, [id, dispatch]);

  return (
    <div className="user-page">
      <Link to='/' className="logo">
        <img src={Logo2} alt="Haud Systems" />
      </Link>
      {id !== undefined ?
        <>
          <div className="user-title">Update {name}'s Details</div>
          <p>Review {name}'s account details and edit or update the account using the form below.</p>
        </> :
        <>
          <div className="user-title">Add A New User</div>
          <p>Please use the from below to add a new user to Haud System's user database.</p>
        </>
      }
      <div className="input-group double">
        <div className="single-input">
          <label htmlFor="firstName">First Name</label>
          <Input 
            inputValue={firstName || ''}
            inputOnChange={(e) => {
              updateFirstName(e.target.value);
              validateField(1);
            }}
            error={fieldNumber === 1 && validateText(firstName).error}
          />
        </div>
        <div className="single-input">
          <label htmlFor="lastName">Last Name</label>
          <Input 
            inputValue={lastName || ''}
            inputOnChange={(e) => {
              updateLastName(e.target.value);
              validateField(2);
            }}
            error={fieldNumber === 2 && validateText(lastName).error}
          />
        </div>
      </div>
      <div className="input-group">
        <div className="single-input">
          <label htmlFor="address1">Address 1</label>
          <Input 
            inputValue={address1 || ''}
            inputOnChange={(e) => {
              updateAddress1(e.target.value);
              validateField(3);
            }}
            inputPlaceHolder="Enter your street address"
            error={fieldNumber === 3 && validateText(address1).error}
          />
        </div>
      </div>
      <div className="input-group">
        <div className="single-input">
          <label htmlFor="address2">Address 2</label>
          <Input 
            inputValue={address2 || ''}
            inputOnChange={(e) => {
              updateAddress2(e.target.value);
              validateField(4);
            }}
            inputPlaceHolder="Apartment number, floor number, etc"
            error={fieldNumber === 4 && validateText(address2).error}
          />
        </div>
      </div>
      <div className="input-group double">
        <div className="single-input">
          <label htmlFor="town">Town</label>
          <Input 
            inputValue={town || ''}
            inputOnChange={(e) => {
              updateTown(e.target.value);
              validateField(5)
            }}
            error={fieldNumber === 5 && validateText(town).error}
          />
        </div>
        <div className="single-input">
          <label htmlFor="region">Region</label>
          <Input 
            inputValue={region || ''}
            inputOnChange={(e) => {
              updateRegion(e.target.value);
              validateField(6);
            }}
            error={fieldNumber === 6 && validateText(region).error}
          />
        </div>
      </div>
      <div className="input-group double">
        <div className="single-input">
          <label htmlFor="postCode">Post Code</label>
          <Input 
            inputValue={postCode || ''}
            inputOnChange={(e) => {
              updatePostCode(e.target.value);
              validateField(7);
            }}
            error={fieldNumber === 7 && validateText(postCode).error}
          />
        </div>
        <div className="single-input">
          <label htmlFor="country">Country</label>
          <Input 
            inputValue={country || ''}
            inputOnChange={(e) => {
              updateCountry(e.target.value);
              validateField(8);
            }}
            error={fieldNumber === 8 && validateText(country).error}
          />
        </div>
      </div>
      <div className="input-group">
        <div className="single-input">
          <label htmlFor="phone">Mobile Number</label>
          <Input 
            inputValue={telephone || ''}
            inputOnChange={(e) => {
              updateTelephone(e.target.value);
              validateField(9);
            }}
            error={fieldNumber === 9 && validatePhone(telephone).error}
          />
        </div>
      </div>
      {addingNewUser || updatingUser ?
        <div className="loader-wrapper">
          <RotatingBoxesLoader 
            loading={true} 
            colors={["#fff","#fff",Colors.primary,Colors.primary]} 
            size={25}
          />
        </div> : null
      }
      {errorMessages(errorField) ?
        <div className="error-message">
          <span>{errorMessages(errorField)}</span>
        </div> : null
      }
      <div className="button-wrap">
        <Button 
          type="pri"
          text={id !== undefined ? `Update ${name}'s Account` : 'Add New User'} 
          onClick={submitDetails}
        />
        <Link to='/'>
          <Button 
            type="ter"
            text="Cancel"
          />
        </Link>
      </div>
    </div>
  )
}

export default UserPage;