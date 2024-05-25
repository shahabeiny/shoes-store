import '../Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/useReduxhook';
import { registerAsync } from 'Redux/store/auth/authThunks';
import LoginModel from 'models/LoginModel';
import FormRegister from 'Components/Form/FormListt/FormRegister/FormRegister';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleForm = async (formData: LoginModel) => {
    try {
      await dispatch(registerAsync(formData)).unwrap();
      navigate('/otp', { state: formData.mobile });
    } catch (error) {
      throw error;
    }
  };

  return (
    <main className="auth">
      <HelmetTitle title="ثبت نام" />
      <div className="auth__wrapper">
        <h1 className="auth__title">ثبت نام</h1>
        <h2 className="auth__login">
          قبلا ثبت نام کرده اید؟ <Link to="/login">وارد شوید</Link>
        </h2>
        <FormRegister onSubmit={handleForm} />
      </div>
    </main>
  );
};

export default Register;
