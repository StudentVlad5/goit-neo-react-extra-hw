import css from './SearchBox.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filter/slice';
import { selectNameFilter } from '../../redux/filter/selectors';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  return (
    <div className={css.searchContaner}>
      <label htmlFor="search">Find contacts by name</label>
      <div className={css.searchBox}>
        <input
          id="search"
          className={css.searchInput}
          type="text"
          value={filter}
          onChange={e => dispatch(changeFilter(e.target.value))}
        />
        {filter.length > 0 && (
          <button
            className={css.closeBtn}
            onClick={() => dispatch(changeFilter(''))}
            type="button"
          >
            <span className={css.closeIcon}>✕</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
