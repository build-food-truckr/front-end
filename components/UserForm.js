import React, {useEffect} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

const roles = ['Foodie','Food Truck Operator'];
const minPasswordLength = 8;

function UserForm(props) {

  useEffect(()=>{
    if (props.isEditing) {
      console.log(props);
      props.setFieldValue('username',props.username);
      props.setFieldValue('email',props.email);
      props.setFieldValue('password',props.password);
      props.setFieldValue('tos',props.tos);
      props.setFieldValue('id',props.id);
    }
  },[props.isEditing]);

  return (
    <Form>
      <div>
        <label htmlFor="username">Username</label><Field type="text" name="username" placeholder="Username" /><br />
        {props.touched.username && props.errors.username?<p className="error">{props.errors.username}</p>:<></>}
        <label htmlFor="email">Email</label><Field type="email" name="email" placeholder="Email" /><br />
        {props.touched.email && props.errors.email?<p className="error">{props.errors.email}</p>:<></>}
        <label htmlFor="password">Password</label><Field type="password" name="password" placeholder="Password" /><br />
        {props.touched.password && props.errors.password?<p className="error">{props.errors.password}</p>:<></>}
        <label htmlFor="role">Role</label><Field as="select" name="role" children={roles}>
          <option value=''>Select</option>
          {roles.map(r=><option value={r} key={r}>{r}</option>)}
        </Field><br />
        {props.errors.role?<p className="error">{props.errors.role}</p>:<></>}
        <label htmlFor="tos" className="check">Do you agree to the Terms of Service? </label><Field type="checkbox" name="tos" /><br />
        {props.errors.tos?<p className="error">{props.errors.tos}</p>:<></>}
        <Field type="hidden" name="id" />
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

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      username: props.username || "",
      email: props.email || "",
      role: props.role || '',
      password: "",
      tos: props.tos || false,
      id: props.id || undefined
    };
  },

  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required("Please include the username"),
    email: Yup.string()
      .email("Must be a valid email address")
      .required("Please enter the user's email"),
    role: Yup.string()
      .oneOf(roles, 'Please select a role'),
    password: Yup.string()
      .min(minPasswordLength, `Password must be at least ${minPasswordLength} characters long`)
      .required("Password is required"),
    tos: Yup.boolean()
      .required('Must Accept Terms and Conditions')
      .oneOf([true], 'Must Accept Terms and Conditions')
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values, formikBag) {
    const hash = bcrypt.hashSync(values.password, 10);
    values.password = hash;
    console.log(values);
    let userToSave = values;
    // I don't think I need this: (MST)
    //if (formikBag.props.isEditing) {
    //  userToSave = {...values, id: formikBag.props.id};
    //}
    formikBag.props.addUserFunction(userToSave);

    formikBag.setStatus("Form Submitting!");
    formikBag.resetForm();
  }
})(UserForm);

export default FormikUserForm;
