import React, {useEffect} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const roles = ['User','Operator'];
const minPasswordLength = 8;

function LoginForm(props) {

  return (
    <Form>
      <div>
        <label htmlFor="username">Username</label><Field type="text" name="username" placeholder="Username" /><br />
        {props.touched.username && props.errors.username?<p className="error">{props.errors.username}</p>:<></>}
        <label htmlFor="password">Password</label><Field type="password" name="password" placeholder="Password" /><br />
        {props.touched.password && props.errors.password?<p className="error">{props.errors.password}</p>:<></>}
        <button className="btn btn-s" disabled={!props.isValid}>Submit</button>
        <style jsx>{`

          label {
            font-family: Roboto;
            color: #504E50;
            margin: 10px 0px;
          }

          label:after {
            content: ': ';
            font-family: Roboto;
            color: #504E50;
          }

          .check:after {
            content: '';
          }

          input, select, checkbox {
            margin: 5px 0px;
          }

          .error {
            color: red;
            font-size: 0.6rem;
            margin: 0;
          }

          /* General button style (reset) */
          .btn {
            border: 1px solid #EF903C;
            color: #fff;
            font-family: Roboto;
            font-size: inherit;
            background: #EF903C;
            cursor: pointer;
            padding: 15px 40px;
            display: inline-block;
            margin: 15px 30px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 700;
            outline: none;
            position: relative;
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
            transition: all 0.3s;
          }

          .btn:hover,
          .btn:active {
            color: #EF903C;
            background: #fff;
          }

          .btn:disabled {
            background: darkgrey;
            border: 1px dotted darkgrey;
            color: lightgrey;
          }

          .btn-s {
            padding: 10px 30px;
          }
          `}</style>
      </div>
    </Form>

  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues(props) {
    return {
      username: props.username || "",
      password: ""
    };
  },

  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required("Please include the username"),
    password: Yup.string()
      .required("Password is required")
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values, formikBag) {
    const hash = ''; // Load hash from your password DB.
    formikBag.props.loginFunction(values);


    formikBag.setStatus("Form Submitting!");
    formikBag.resetForm();
  }
})(LoginForm);

export default FormikLoginForm;
