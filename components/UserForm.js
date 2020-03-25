import React, {useEffect} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

function UserForm(props) {
  const roles = ['User','Operator'];

  useEffect(()=>{
    if (props.isEditing) {
      console.log(props);
      props.setFieldValue('uname',props.uname);
      props.setFieldValue('email',props.email);
      props.setFieldValue('password',props.password);
      props.setFieldValue('tos',props.tos);
      props.setFieldValue('id',props.id);
    }
  },[props.isEditing]);

  return (
    <Form>
      <div>
        <label htmlFor="uname">Name</label><Field type="text" name="uname" placeholder="Name" /><br />
        {props.touched.uname && props.errors.uname?<p className="error">{props.errors.uname}</p>:<></>}
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
        <button disabled={!props.isValid}>Submit</button>
        <style jsx>{`
          label {
            margin: 10px 0px;
          }

          label:after {
            content: ': ';
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
          `}</style>
      </div>
    </Form>

  );
}

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      uname: props.uname || "",
      email: props.email || "",
      role: props.role || '',
      password: props.password || "",
      tos: props.tos || false,
      id: props.id || (props.currentId+1)
    };
  },
  //id still gives same id... will need to find another way if going to edit

  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    uname: Yup.string()
      .required("Please include the username"),
    email: Yup.string()
      .email("Must be a valid email address")
      .required("Please enter the user's email"),
    role: Yup.string()
      .oneOf(['User','Operator'], 'Please select a role'),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    tos: Yup.boolean()
      .required('Must Accept Terms and Conditions')
      .oneOf([true], 'Must Accept Terms and Conditions')
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values, formikBag) {
    console.log(values);
    const userToSave = {...values, id: formikBag.props.currentId};
    formikBag.props.addFunction(userToSave);

    formikBag.setStatus("Form Submitting!");
    formikBag.resetForm();



    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
  }
})(UserForm);

export default FormikUserForm;
