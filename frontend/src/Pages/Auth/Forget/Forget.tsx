import '../Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/useReduxhook';
import { forget } from 'Redux/store/auth/authThunks';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import FormForget from 'Components/Form/FormListt/FormForget/FormForget';

const Forget = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleForm = async (formData: string) => {
    try {
      await dispatch(forget(formData)).unwrap();
      navigate('/otp', { state: formData });
    } catch (error) {
      throw error;
    }
  };

  return (
    <main className="auth">
      <HelmetTitle title="فراموشی رمز" />
      <div className="auth__wrapper">
        <h1 className="auth__title">فراموشی رمز</h1>
        <h2 className="auth__login">
          <Link to="/login">وارد شوید</Link>
        </h2>
        <FormForget onSubmit={handleForm} />
      </div>
    </main>
  );
};

export default Forget;
