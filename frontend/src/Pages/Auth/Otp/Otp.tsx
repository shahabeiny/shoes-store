 import { useContext, useEffect } from 'react';
import { useAppDispatch } from 'hooks/useReduxhook';
import '../Auth.css';
import { otpCheck, otpRestore } from 'Redux/store/auth/authThunks';
import { useLocation, useNavigate } from 'react-router-dom';
import { showSuccessSwal } from 'utilities/sweetalert';
import { AuthContext } from 'context/ContextAuth';
import FormOtp from 'Components/Form/FormListt/FormOtp/FormOtp';

const Otp = () => {
  const dispatch = useAppDispatch();
  const { state,pathname } = useLocation();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);


  useEffect(() => {
    if (!state && pathname !== '/register' && pathname !== '/forget') {
      navigate('/');
    }
  }, [state, navigate]);

  const sendOtp = async (code: string) => {
    try {
      const res = await dispatch(otpCheck({ code, mobile: state })).unwrap();
      if (pathname === '/register') {
        authContext.login(res.user, res.token);
        showSuccessSwal('با موفقیت وارد شدید');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        navigate('/change-pass', { state: state });
      }
    } catch (error) {
      throw error;
    }
  };

  const restoreCode = async () => {
    try {
      const result = await dispatch(otpRestore(state)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  return (
    <main className="auth">
      <div className="auth__wrapper">
        <h1 className="auth__title">کد تایید</h1>
        <FormOtp
          time={3}
          mobile={state}
          onSubmitOtp={(code) => sendOtp(code)}
          onRestoreCode={restoreCode}
        />
      </div>
    </main>
  );
};

export default Otp;
