import css from './SearchBox.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';

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
