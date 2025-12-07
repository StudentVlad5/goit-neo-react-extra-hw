import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../Button/Button';
import css from './ContactForm.module.css';
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import { toast } from 'react-toastify';
import { selectContacts } from '../../redux/contactsSlice';

const ContactFormSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  phoneNumber: Yup.string()
    .matches(/^[0-9-]+$/, 'Phone number must contain only digits and dashes')
    .min(3, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
});

const initialValues = {
  userName: '',
  phoneNumber: '',
};

const ContactForm = () => {
  const userNameId = useId();
  const phoneNumberId = useId();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    const newUser = {
      name: values.userName,
      phone: values.phoneNumber,
    };
    const isDuplicateName = contacts.some(
      contact => contact?.name.toLowerCase() === newUser.name.toLowerCase()
    );

    if (isDuplicateName) {
      toast(`${newUser.name} вже є у контактах!`);
      return;
    }
    const isDuplicateNumber = contacts.some(
      contact => contact?.phone.trim() === newUser.phone.trim()
    );

    if (isDuplicateNumber) {
      toast(`${newUser.phone} вже є у контактах!`);
      return;
    }

    dispatch(addContact({ ...newUser }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactFormSchema}
    >
      {({ isValid, dirty }) => (
        <Form className={css.formContainer}>
          <div>
            <label htmlFor={userNameId}>Name</label>
            <Field type="text" name="userName" id={userNameId} />
            <ErrorMessage
              className={css.error}
              name="userName"
              component="div"
            />
          </div>

          <div>
            <label htmlFor={phoneNumberId}>Phone number</label>
            <Field type="text" name="phoneNumber" id={phoneNumberId} />
            <ErrorMessage
              className={css.error}
              name="phoneNumber"
              component="div"
            />
          </div>

          <Button
            btnName={!isValid || !dirty ? 'Add contact' : 'Save'}
            type={'submit'}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
