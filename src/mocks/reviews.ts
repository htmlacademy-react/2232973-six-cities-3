import { Review } from '@/types/reviews';

export const mockReviews: Review[] = [
  {
    id: '101',
    date: '2025-05-01T12:00:00Z',
    user: {
      name: 'Alice',
      avatarUrl: 'img/avatar-alice.jpg',
      isPro: true,
    },
    comment: 'Great place! Clean and cozy.',
    rating: 5,
  },
  {
    id: '102',
    date: '2025-05-02T14:30:00Z',
    user: {
      name: 'Bob',
      avatarUrl: 'img/avatar-bob.jpg',
      isPro: false,
    },
    comment: 'Pretty decent, but could use better wifi.',
    rating: 3,
  },
  {
    id: '103',
    date: '2025-05-03T10:15:00Z',
    user: {
      name: 'Charlie',
      avatarUrl: 'img/avatar-charlie.jpg',
      isPro: false,
    },
    comment: 'Lovely location and friendly host.',
    rating: 4,
  },
  {
    id: '104',
    date: '2025-05-04T16:45:00Z',
    user: {
      name: 'Diana',
      avatarUrl: 'img/avatar-diana.jpg',
      isPro: true,
    },
    comment: 'Small, but well-equipped.',
    rating: 4,
  },
  {
    id: '105',
    date: '2025-05-05T09:00:00Z',
    user: {
      name: 'Ethan',
      avatarUrl: 'img/avatar-ethan.jpg',
      isPro: false,
    },
    comment: 'Noisy neighbors, not ideal.',
    rating: 2,
  },
  {
    id: '106',
    date: '2025-05-06T11:25:00Z',
    user: {
      name: 'Fiona',
      avatarUrl: 'img/avatar-fiona.jpg',
      isPro: true,
    },
    comment: 'Stylish and modern. I’ll be back!',
    rating: 5,
  },
  {
    id: '107',
    date: '2025-05-07T13:00:00Z',
    user: {
      name: 'George',
      avatarUrl: 'img/avatar-george.jpg',
      isPro: false,
    },
    comment: 'Great for a short stay.',
    rating: 4,
  },
  {
    id: '108',
    date: '2025-05-08T15:10:00Z',
    user: {
      name: 'Hannah',
      avatarUrl: 'img/avatar-hannah.jpg',
      isPro: true,
    },
    comment: 'Could be cleaner. Otherwise okay.',
    rating: 3,
  },
  {
    id: '109',
    date: '2025-05-09T17:35:00Z',
    user: {
      name: 'Ivan',
      avatarUrl: 'img/avatar-ivan.jpg',
      isPro: false,
    },
    comment: 'The view was amazing!',
    rating: 5,
  },
  {
    id: '110',
    date: '2025-05-10T08:20:00Z',
    user: {
      name: 'Julia',
      avatarUrl: 'img/avatar-julia.jpg',
      isPro: false,
    },
    comment: 'Not worth the price.',
    rating: 2,
  },
];
