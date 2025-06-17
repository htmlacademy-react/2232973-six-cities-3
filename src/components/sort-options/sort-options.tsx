import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setSortType } from '@/store/offers-slice';

const sortTypes = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export default function SortOptions() {
  const dispatch = useAppDispatch();
  const currentSortType = useAppSelector((state) => state.offers.sortType);
  const [isOpened, setIsOpened] = useState(false);

  const toggleSortList = () => {
    setIsOpened(!isOpened);
  };

  const handleSortTypeChange = (type: string) => {
    dispatch(setSortType(type));
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleSortList}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpened ? 'places__options--opened' : ''
        }`}
      >
        {sortTypes.map((type) => (
          <li
            key={type}
            className={`places__option${
              type === currentSortType ? ' places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSortTypeChange(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}
