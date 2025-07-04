import { useAppDispatch } from '@/hooks';
import { postComment } from '@/store/comments-slice';
import { useState, FormEvent, ChangeEvent, Fragment, memo } from 'react';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

type CommentFormProps = {
  offerId: string | undefined;
};

export const CommentForm = memo(({ offerId }: CommentFormProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState<{
    rating: number | null;
    reviewText: string;
  }>({rating: null, reviewText: ''});

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? Number(value) : value
    });
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!offerId || isSending || !formData.rating || formData.reviewText.length < MIN_COMMENT_LENGTH || formData.reviewText.length >= MAX_COMMENT_LENGTH) {
      return;
    }

    setIsSending(true);
    dispatch(postComment({
      offerId,
      comment: formData.reviewText,
      rating: formData.rating,
    })).unwrap()
      .then(() => {
        setFormData({ rating: null, reviewText: '' });
      })
      .catch(() => {
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const isValid = formData.rating !== null && formData.reviewText.length >= MIN_COMMENT_LENGTH && formData.reviewText.length < MAX_COMMENT_LENGTH && !isSending;
  const { rating: rawRating, reviewText } = formData;
  const rating = typeof rawRating === 'string' ? Number(rawRating) : rawRating;
  const ratingTitles = ['terribly', 'badly', 'not bad', 'good', 'perfect'];

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((value) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={Number(rating) === value}
              onChange={handleChange}
              data-testid={`rating-${value}`}
              disabled={isSending}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={ratingTitles[value - 1]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="reviewText"
        value={reviewText}
        onChange={handleChange}
        placeholder="Tell how was your stay, what you like and what can be improved"
        maxLength={MAX_COMMENT_LENGTH}
        disabled={isSending}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isSending}
        >
          Submit
        </button>
      </div>
    </form>
  );
});

CommentForm.displayName = 'CommentForm';

export default CommentForm;
