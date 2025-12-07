import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../Button/Button';
import css from './RegistrationForm.module.css';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

const RegistrationFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const initialValues = {
  name: '',
  password: '',
  email: '',
};

const RegistrationForm = () => {
  const nameId = useId();
  const userEmailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const signUpData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    dispatch(register(signUpData));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegistrationFormSchema}
    >
      {({ isValid, dirty }) => (
        <Form className={css.formContainer}>
          <div>
            <label htmlFor={nameId}>Name</label>
            <Field type="text" name="name" id={nameId} />
            <ErrorMessage className={css.error} name="name" component="div" />
          </div>
          <div>
            <label htmlFor={userEmailId}>Email</label>
            <Field type="text" name="email" id={userEmailId} />
            <ErrorMessage className={css.error} name="email" component="div" />
          </div>

          <div>
            <label htmlFor={passwordId}>Password</label>
            <Field type="text" name="password" id={passwordId} />
            <ErrorMessage
              className={css.error}
              name="password"
              component="div"
            />
          </div>

          <Button
            btnName={!isValid || !dirty ? 'Add data' : 'Sign Up'}
            type={'submit'}
          />
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
