import '../Auth.css';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'hooks/useReduxhook';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAsync } from 'Redux/store/auth/authThunks';
import { showSuccessSwal } from 'utilities/sweetalert';
import { AuthContext } from 'context/ContextAuth';
import FormLogin from 'Components/Form/FormListt/FormLogin/FormLogin';
import LoginModel from 'models/LoginModel';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleForm = async (formData: LoginModel) => {
    try {
      const res = await dispatch(loginAsync(formData)).unwrap();
      authContext.login(res.user, res.token);
      showSuccessSwal('با موفقیت وارد شدید');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      throw error;
    }
  };

  return (
    <main className="auth">
        <HelmetTitle title="ورود" />
      <div className="auth__wrapper">
        <h1 className="auth__title">ورود</h1>
        <h2 className="auth__login">
          حساب کاربری ندارید؟ <Link to="/register">ثبت نام</Link>
        </h2>
        <FormLogin onSubmit={handleForm} />
        <h2 className="auth__forget">
         <Link to="/forget" className="auth__forget-link">فراموشی رمز</Link>
        </h2>
      </div>
    </main>
  );
};

export default Login;
