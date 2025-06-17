type User = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
    email: string;
    token: string;
};

type UserAuth = Pick<User, 'email'> & { password: string };

export {
  type User,
  type UserAuth,
};
