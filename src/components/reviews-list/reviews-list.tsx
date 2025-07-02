import CommentForm from '../comment-form';
import ReviewItem from '../review/review-item';
import { Review } from '../../types/reviews';
import { AuthorizationStatus } from '@/const';

const MAX_REVIEWS = 10;

type ReviewListProps = {
  reviews: Review[];
  authorizationStatus: AuthorizationStatus;
  offerId: string | undefined;
}

export default function ReviewsList({ reviews, authorizationStatus, offerId }: ReviewListProps): JSX.Element {

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews_list">
        {reviews.slice(0, MAX_REVIEWS).map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
        {authorizationStatus === AuthorizationStatus.Auth && <CommentForm offerId={offerId} />}
      </ul>
    </section>
  );
}
