import userAvatar from '../../../assets/user.svg';
import phoneIcon from '../../../assets/phone.svg';
import Button from '../../Button/Button';
import css from './Contact.module.css';
import { deleteContact } from '../../../redux/contactsOps';
import { useDispatch } from 'react-redux';

const Contact = ({ con: { name, phone, id } }) => {
  const dispatch = useDispatch();
  if ((!name, !phone, !id)) {
    return null;
  }
  return (
    <li className={css.contactContainer}>
      <p className={css.contactWrap}>
        <span className={css.contactRow}>
          <img
            className={css.image}
            src={userAvatar}
            aria-label="userAvatar"
            alt="user Avatar"
          />
          {name}
        </span>
        <span className={css.contactRow}>
          <img
            className={css.image}
            src={phoneIcon}
            aria-label="phoneIcon"
            alt="phone Icon"
          />
          {phone}
        </span>
      </p>

      <Button
        btnName={'Delete'}
        type={'button'}
        handleOperation={() => dispatch(deleteContact(id))}
      />
    </li>
  );
};

export default Contact;
