import './LoginForm.css';

import {Formik, Form} from 'formik';
import {useDispatch, useSelector} from 'react-redux';

import {TextField} from 'src/components/LoginPage/TextField';
import {Button} from 'src/components/Button';

import {fetchAuthenticate} from 'src/store/auth/slice';
import {selectAuthIsLoading} from 'src/store/auth/selectors';
import {initialValuesForm, validateForm} from './loginForm.utils';
import {AuthValues} from 'src/types/auth';

const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthIsLoading);

  const submitFormHangler = (values: AuthValues) => {
    dispatch(fetchAuthenticate(values));
  };

  return (
    <Formik initialValues={initialValuesForm} validate={validateForm} onSubmit={submitFormHangler}>
      <Form className="LoginForm">
        <TextField id="login" label="Логин" name="login" type="text" />
        <TextField id="sublogin" label="Cублогин" name="sublogin" type="text" isOptional />
        <TextField id="password" label="Пароль" name="password" type="password" />
        <Button classes="LoginForm-button" isLoading={isLoading} disabled={isLoading} type="submit">
          Войти
        </Button>
      </Form>
    </Formik>
  );
};

export {LoginForm};
