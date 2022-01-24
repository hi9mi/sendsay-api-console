import {AuthValues} from 'src/types/auth';

const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;
const mailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const loginPattern = /^[a-zA-Z0-9_]+$/;

const initialValuesForm: AuthValues = {
  login: '',
  sublogin: '',
  password: '',
};

const validateForm = (values: AuthValues) => {
  const {login, password} = values;
  const errors = {} as Partial<AuthValues>;

  if (!login.trim().length) {
    errors.login = 'Обязательное поле';
  } else if (!mailPattern.test(login) && !loginPattern.test(login)) {
    errors.login = 'Невалидный логин';
  }

  if (!password.trim().length) {
    errors.password = 'Обязательное поле';
  } else if (cyrillicPattern.test(password)) {
    errors.password = 'Нельзя использовать кириллицу в пароле';
  }

  return errors;
};

export {initialValuesForm, validateForm};
