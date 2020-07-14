export const whiteSpace = /^\s+$/
const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/


export const mergeUpdateObj = (prevObj, nextObj) => {
  return {
    ...prevObj,
    ...nextObj,
  };
};

export const validateText = (text: string) => {
  if (!text.length) {
    return {
      error: true
    }
  } else if (whiteSpace.test(text)) {
    return {
      error: true
    }
  }

  return {
    error: false,
    message: ''
  }
}

export const validatePhone = (phoneNumber: string) => {
  if (!phoneNumber.length) {
    return {
      error: true,
      message: 'Your mobile number is required'
    }
  } else if (!phoneNumber.match(phoneRegex)) {
    return {
      error: true,
      message: 'Your mobile number is invalid'
    }
  }

  return {
    error: false,
    message: ''
  }
}

export const errorMessages = (errorField: number) => {
  switch (errorField) {
    case 1:
      return 'Please fill in your first name';
    case 2:
      return 'Please fill in your last name';
    case 3:
      return 'Please fill in your street address';
    case 4:
      return 'Please fill in your apartment or building number';
    case 5:
      return 'Please fill in your town';
    case 6:
      return 'Please fill in your region';
    case 7:
      return 'Please fill in your post code';
    case 8:
      return 'Please fill in your country';
    case 9:
      return 'Please fill in a valid mobile number';
  }

  return '';
}

export const mapFirebaseResponseToState = (firebaseResponse) => {
  let arr = [];

  if (firebaseResponse) {
    for (let i = 0; i < firebaseResponse.length; i++) {
      const docId = firebaseResponse[i].name.split('/')[6];
      const fieldsObj = firebaseResponse[i].fields;
      const newFields = Object.keys(fieldsObj).reduce((acc, val) => {
        acc[val] = fieldsObj[val].stringValue;
        return acc;
      }, {});
  
      arr.push({...newFields, userId: docId});
    }
  }

  return arr.sort((a, b) => b.dateCreated.localeCompare(a.dateCreated));
};



export const updateUserDetailsUrl = (userId: string) => {
  return `/users/${userId}?updateMask.fieldPaths=firstName&updateMask.fieldPaths=lastName&updateMask.fieldPaths=address1&updateMask.fieldPaths=address2&updateMask.fieldPaths=town&updateMask.fieldPaths=region&updateMask.fieldPaths=postCode&updateMask.fieldPaths=country&updateMask.fieldPaths=contactNumber`;
};

export const updateUserDetailsObj = (
  firstName: string,
  lastName: string,
  address1: string,
  address2: string,
  town: string,
  region: string,
  postCode: string,
  country: string,
  contactNumber: string,
  userId?: string,
  dateCreated?: string
) => {
  return {
    fields: {
      firstName: { stringValue: firstName },
      lastName: { stringValue: lastName },
      address1: { stringValue: address1 },
      address2: { stringValue: address2 },
      town: { stringValue: town },
      region: { stringValue: region },
      country: { stringValue: country },
      postCode: { stringValue: postCode },
      contactNumber: { stringValue: contactNumber },
      userId: { stringValue: userId },
      dateCreated: { stringValue: dateCreated }
    }
  }
};
