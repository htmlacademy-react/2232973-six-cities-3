export default function ReviewsList({ reviews }: { reviews: Review[] }): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
      <ul className="reviews_list">

      </ul>
    </section>
  );
}
