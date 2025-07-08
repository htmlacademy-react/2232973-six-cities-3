import { formatDateToMonthYear, getRatingWidth } from '@/common';
import { Review } from '@/types/reviews';
import { memo } from 'react';

type ReviewItemProps = {
  review: Review;
}

export const ReviewItem = memo(({ review }: ReviewItemProps): JSX.Element => {
  const { user, comment, date, rating } = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
        {user.isPro && <span className="reviews__user-status">Pro</span>}
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: getRatingWidth(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>{formatDateToMonthYear(date)}</time>
      </div>
    </li>
  );
});

ReviewItem.displayName = 'ReviewItem';

export default ReviewItem;
