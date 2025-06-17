export type User = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
    email: string;
    token: string;
};

export type UserAuth = Pick<User, 'email'> & { password: string };
