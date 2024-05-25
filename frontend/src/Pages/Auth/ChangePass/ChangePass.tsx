import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormChangePass from 'Components/Form/FormListt/FormChangePass/FormChangePass';
import { changePass } from 'Redux/store/auth/authThunks';
import { useAppDispatch } from 'hooks/useReduxhook';

const ChangePass = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  const handleForm = async (formData: string) => {
    try {
      await dispatch(changePass({ mobile: state, password: formData })).unwrap();
      navigate('/login');
    } catch (error) {
      throw error;
    }
  };

  return (
    <main className="auth">
      <HelmetTitle title="تغییر رمز" />
      <div className="auth__wrapper">
        <h1 className="auth__title">تغییر رمز"</h1>

        <h2 className="auth__login">
          <Link to="/login">وارد شوید</Link>
        </h2>
        <FormChangePass onSubmit={handleForm} />
      </div>
    </main>
  );
};

export default ChangePass;
