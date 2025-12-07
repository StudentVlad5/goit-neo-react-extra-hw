import Contact from './Contact/Contact';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/selectors';

import css from './ContactList.module.css';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  if (!filteredContacts) {
    return null;
  }
  return (
    <ul className={css.containerList}>
      {filteredContacts.map(con => {
        return <Contact key={con.id} con={con} />;
      })}
    </ul>
  );
};

export default ContactList;
