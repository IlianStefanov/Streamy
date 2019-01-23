import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createStream } from '../../actions/streamsActions';

class StreamCreate extends React.Component {
  // Display the error message but field color change method is applied for 
  // displaying errors so this method is only defined and never used
  renderError = ({ error, touched }) => {
    const showErrorOnSubmitFail = touched && error ? 
    <div className="ui tiny message">
      
        {error}
      
    </div> : <div></div>;
    return showErrorOnSubmitFail;
  }

  // Every time this function is called it destructures the properties from the big object received from 
  // reduxForm();
  renderInput = ({ input, label, meta }) => {
    console.info("errors object: ", meta);
    console.info("Desctructured input props from received form props object: ", input);
    const classNames = `field ${meta.error && meta.touched ? "error" : ""}`
    const placeholerMessage = `${meta.error && meta.touched ? meta.error : label}`;
      return (
       
          <div className={classNames}>
              {/* <label>{label}</label> */}
              <input {...input} placeholder={placeholerMessage} autoComplete="off"/>
              {/* Display appropriate error message for the specific input */}
              {/* {this.renderError(meta)} */}
         
        </div>
      );
  }

  onSubmit = (formValues) => {
    console.info("These are the received values from built in redux-form function handleSubmit(our method handling the submit); ", formValues);
    const { title, description } = formValues;
    console.info(formValues);
    const { isSignedIn, userId } = this.props.auth;
    console.log(userId, isSignedIn);

    const streamData = {
        title, 
        description,
        userId
    };

    if(isSignedIn) {
       this.props.createStream(streamData);
    }
  }

  render() {
    // This is the object with tons of properties that we need to handle forms. This object gets automatically
    // assigned to the props (accessible by this.props) by calling the reduxForm function with form name and 
    // component
    console.info("Stream create props: ", this.props);
    const { handleSubmit, submitting, pristine } = this.props;

    return (
      <div>
          {/* This big object gets consumed by the handleSubmit(the callback function called here desctuctures the
              the properties with the correct values) */}
          <form onSubmit={handleSubmit(this.onSubmit)} className="ui form attached fluid">
             <h2>Create new stream</h2>
             {/* If the value from the name property of the <Field /> is equal to some of the properties of the 
                 errors object that we pass through our validate arrow function to reduxForm build in function with 
                 property validate it automatically gets passed as prop to the <Field/>'s component property where a 
                 function for rendering component is passed. Then you can access  */}
                  <div className="two fields">
                    <Field name="title" component={this.renderInput} label="Enter Title" />
                    <Field name="description" component={this.renderInput} label="Enter Description" />
                  </div>
             <button type="submit" className="positive ui button">Submit</button>
             {/*This is short validation provided by reduxForm for disabling the
                submit button if the Fields are empty disabled={pristine || submitting} */}
          </form>
      </div>
    )
  }
}

const validate = formValues => {
  const errors = {};
  if(!formValues.title) {
      errors.title = "You must enter a title";
  } 
  
  if(!formValues.description) {
      errors.description = "You have to enter a description";
  } 
  return errors;
};  

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

const formWrapped = reduxForm({
  form: 'streamCreate',
  validate
})(StreamCreate);

export default connect(mapStateToProps, { createStream })(formWrapped);