import { useAppDispatch, useAppSelector } from '@/hooks';
import { setSortType } from '@/store/action';

const sortTypes = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export default function SortOptions() {
  const dispatch = useAppDispatch();
  const currentSortType = useAppSelector((state) => state.sortType);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
                  Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortTypes.map((type) => (
          <li
            key={type}
            className={`places__option${type === currentSortType ? ' places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => dispatch(setSortType(type))}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}
