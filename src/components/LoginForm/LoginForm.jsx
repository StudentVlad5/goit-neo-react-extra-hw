import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../Button/Button';
import css from './LoginForm.module.css';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';

const LoginFormSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const initialValues = {
  password: '',
  email: '',
};

const LoginForm = () => {
  const userEmailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };
    dispatch(login({ ...loginData }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginFormSchema}
    >
      {({ isValid, dirty }) => (
        <Form className={css.formContainer}>
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
            btnName={!isValid || !dirty ? 'Add data' : 'Login'}
            type={'submit'}
          />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
