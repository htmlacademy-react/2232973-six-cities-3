import { render, screen, fireEvent } from '@testing-library/react';
import { SortOptions } from './sort-options';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();

describe('SortOptions', () => {
  it('renders current sort type', () => {
    const store = mockStore({ offers: { sortType: 'Popular' } });
    render(
      <Provider store={store}>
        <SortOptions />
      </Provider>
    );
    expect(screen.getAllByText('Popular').length).toBeGreaterThan(0);
  });

  it('opens and closes sort list on click', () => {
    const store = mockStore({ offers: { sortType: 'Popular' } });
    const { container } = render(
      <Provider store={store}>
        <SortOptions />
      </Provider>
    );
    const sortType = container.querySelector('.places__sorting-type');
    const list = container.querySelector('.places__options');
    fireEvent.click(sortType!);
    expect(list).toHaveClass('places__options--opened');
    fireEvent.click(sortType!);
    expect(list).not.toHaveClass('places__options--opened');
  });

  it('dispatches setSortType and closes list on option click', () => {
    const store = mockStore({ offers: { sortType: 'Popular' } });
    store.dispatch = vi.fn();
    const { container } = render(
      <Provider store={store}>
        <SortOptions />
      </Provider>
    );
    const sortType = container.querySelector('.places__sorting-type');
    fireEvent.click(sortType!);
    const option = screen.getByText('Price: high to low');
    fireEvent.click(option);
    expect(store.dispatch).toHaveBeenCalled();
    const list = container.querySelector('.places__options');
    expect(list).not.toHaveClass('places__options--opened');
  });
});
