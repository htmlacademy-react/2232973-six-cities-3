import { UserAuth } from '../../types/user';
import { FormEvent, useRef, useMemo } from 'react';
import { loginUser } from '../../store/user-slice';
import { useAppDispatch } from '@/hooks';
import { SIX_CITIES } from '@/const';
import { setCity } from '@/store/offers-slice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const randomCity = useMemo(() => {
    const index = Math.floor(Math.random() * SIX_CITIES.length);
    return SIX_CITIES[index];
  }, []);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = formRef.current;
    if (!form) {
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as UserAuth;

    dispatch(loginUser(data));
  };

  const handleCityClick = () => {
    dispatch(setCity(randomCity));
    navigate('/');
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" ref={formRef} onSubmit={handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <button className="locations__item-link" type="button" onClick={handleCityClick}>
              <span>{randomCity.name}</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
