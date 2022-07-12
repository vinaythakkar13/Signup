//
import React, { useState, useEffect } from "react";
import HookForm from "../../Components/Hookform";
import Label from "../../Components/UI/Label/Label";
import TextField from "../../Components/UI/TextField/TextField";
import Constant from "../../Constant";
import CustomButton from "../../Components/UI/CustomButton/CustomButton";
import Checkbox from "../../Components/UI/CheckBox/CheckBox";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import ToastComponent from "../../Components/UI/ToastComponent/ToastComponent";
import "./Signup.scss";
import useWindowDimension from "../../Components/UseWindowDimension";

const fanAPI = axios.create({
  baseURL:'http://wren.in:3200/api/sign-up/fan'
});

const talentAPI = axios.create({
  baseURL:'http://wren.in:3200/api/sign-up/fan'
});

function Signup() {
  const [, setSignupForm] = useState();
  const [userType, setUserType] = useState("FAN");
  const [agreeTC, setAgreeTC] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [tabHeight, setTabHeight] = useState(0);
  const dimensions = useWindowDimension();

  useEffect(() => {
    setTabHeight(document.getElementsByClassName('tabContainer')[0]?.offsetHeight);
  }, [])
  

  const onSignupSubmit = async (data) => {
    const user = {
      first_name: data.firstName,
      last_name: data.lastName,
      username: data.userName,
      email: data.email,
      password: data.password,
    };

    if(userType === 'FAN'){
      await fanAPI.post('', user).then(res => {
        // console.log('Response : ', res);
        setShowToastMessage(true);
        setToastType('success');
        setToastMessage('Signup successfully.');
      }).catch(err => {
        // console.log('Error : ', err);
        setShowToastMessage(true);
        setToastType('error');
        setToastMessage('Something went wrong.');
      });
    }
    else{
      await talentAPI.post('', user).then(res => {
        // console.log('Response : ', res);
        setShowToastMessage(true);
        setToastType('success');
        setToastMessage('Signup successfully.');
      }).catch(err => {
        // console.log('Error : ', err);
        setShowToastMessage(true);
        setToastType('error');
        setToastMessage('Something went wrong.');
      });
    }
  };

  const sForm = {
    fName: {
      name: "firstName",
      validate: {
        required: {
          value: true,
          message: "First name is required",
        },
        pattern: {
          value: Constant.REGEX.NAME,
          message: "First name can only contain letters of the alphabet",
        },
      },
    },
    lName: {
      name: "lastName",
      validate: {
        required: {
          value: true,
          message: "Last name is required",
        },
        pattern: {
          value: Constant.REGEX.NAME,
          message: "Last name can only contain letters of the alphabet",
        },
      },
    },
    uName: {
      name: "userName",
      validate: {
        required: {
          value: true,
          message: "User name is required",
        },
        pattern: {
          value: Constant.REGEX.ALPHANUMERIC,
          message: "User name can only contain letters of the alphanumeric",
        },
      },
    },
    password: {
      name: "password",
      validate: {
        required: {
          value: true,
          message: "Password is required.",
        },
        validate: {
          length: (value) => (value && value.length >= 8) || "",
          hasUpperLowercase: (value) =>
            value && value.match(Constant.REGEX.LOWERCASEUPPERCASE) !== null,
          hasNumbers: (value) =>
            (value && value.match(Constant.REGEX.NUMBER)) !== null,
          hasSpecialChar: (value) =>
            (value && value.match(Constant.REGEX.SPECIALCHARACTERS)) !== null,
        },
      },
    },
    email: {
      name: "email",
      validate: {
        required: {
          value: true,
          message: "Email is required",
        },
        pattern: {
          value: Constant.REGEX.EMAIL,
          message: "Are you sure you entered a valid email?",
        },
      },
    },
  };

  const multiErrorFields = [
    { length: "Password must contain atleast 8 characters" },
    {
      hasUpperLowercase:
        "Password must contain one Uppercase and\nOne lowercase character",
    },
    { hasNumbers: "Password must contain one numeric value" },
    { hasSpecialChar: "Password must contain one special character" },
  ];

  return (
    <div className="signUpPage">
      <div className="innerContainer">
        <HookForm
          form={(form) => setSignupForm(form)}
          onSubmit={onSignupSubmit}
        >
          {(formMethod) => {
            return (
              <div className="formContainer">
                <Tabs
                  defaultActiveKey="FAN"
                  id="uncontrolled-tab-example"
                  className="mb-3 tabContainer"
                  onSelect={(key) => setUserType(key)}
                >
                  <Tab eventKey="FAN" title="FAN SIGNUP"></Tab>
                  <Tab eventKey="TALENT" title="TALENT SIGNUP"></Tab>
                </Tabs>
                <div className="formInnerContainer table-scroll" style={{height:dimensions.height - tabHeight - 48 -64 +'px'}}>
                <Label
                  className="formHeader"
                  title={`CREATE YOUR ${userType} ACCOUNT`}
                />
                <Label title="First Name" required={true} />
                <TextField
                  rules={sForm.fName.validate}
                  name={sForm.fName.name}
                  errors={formMethod?.formState.errors}
                  formMethod={formMethod}
                  type={"text"}
                  placeholder={"First name"}
                />
                <Label title="Last Name" required={true} />
                <TextField
                  rules={sForm.lName.validate}
                  name={sForm.lName.name}
                  errors={formMethod?.formState.errors}
                  formMethod={formMethod}
                  type={"text"}
                  placeholder={"Last name"}
                />
                <Label title="User name" required={true} />
                <TextField
                  rules={sForm.uName.validate}
                  name={sForm.uName.name}
                  errors={formMethod?.formState.errors}
                  formMethod={formMethod}
                  type={"text"}
                  placeholder={"User name"}
                />
                <Label title="Email" required={true} />
                <TextField
                  rules={sForm.email.validate}
                  name={sForm.email.name}
                  errors={formMethod?.formState.errors}
                  formMethod={formMethod}
                  type={"text"}
                  placeholder={"E-mail"}
                />
                <Label title="Password" required={true} />
                <TextField
                  rules={sForm.password.validate}
                  name={sForm.password.name}
                  errors={formMethod?.formState.errors}
                  formMethod={formMethod}
                  type={"text"}
                  multiErrorFields={multiErrorFields}
                  placeholder={"Password"}
                />
                <Checkbox
                  checked={agreeTC}
                  labelTitle={"I agree to all"}
                  link={"https://www.google.com/"}
                  subtitle={"Terms and Conditions."}
                  id="termsAndCondition"
                  onCheckedChange={(e) => setAgreeTC(e)}
                />
                <CustomButton
                  title="SIGN UP"
                  disabled={!(formMethod?.formState?.isValid && agreeTC)}
                  className="formSubmit"
                />
              </div>
              </div>
            );
          }}
        </HookForm>
      </div>
      <ToastComponent 
      show={showToastMessage}
      type={toastType}
      message={toastMessage}
      />
    </div>
  );
}

export default Signup;
