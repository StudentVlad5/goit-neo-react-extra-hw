import css from './Button.module.css';

const Button = ({ btnName, type, handleOperation }) => {
  return (
    <button className={css.btn} type={type} onClick={handleOperation}>
      {btnName}
    </button>
  );
};

export default Button;
