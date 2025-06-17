export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
  offerId: string;
}

export type NewReview = {
  comment: string;
  rating: number;
}

export type ReviewAuth = NewReview & {
  offerId: string;
}
