import { memo, FC, useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import Button from 'Components/Buttons/Button/Button';
import IconLazy from 'Components/Icon/IconLazy';
import CounterDown from 'Components/CounterDown/CounterDown';
import { showToast } from 'utilities/tostifyalert';

type FormOtpPros = {
  time: number;
  mobile: string;
  onSubmitOtp: (code: string) => Promise<any>;
  onRestoreCode: () => Promise<any>;
};

const FormOtp: FC<FormOtpPros> = ({ mobile, time, onRestoreCode, onSubmitOtp }) => {
  const [otp, setOtp] = useState('');
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setShowTimer(false);
      },
      time * 60 * 1000
    );

    return () => clearTimeout(timer);
  }, [showTimer]);

  const restoreCode = async () => {
    try {
      await onRestoreCode();
      setShowTimer((pre) => !pre);
    } catch (error) {
      setShowTimer(false);
    }
  };

  const submitOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (otp.length && otp.length === 5) {
        await onSubmitOtp(otp);
      } else {
        showToast('مقدار فیلد باید وارد شود', 'error');
      }
    } catch (error) {}
  };

  const getTimer = () => {
    let currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + time);
    return currentDate.toString();
  };

  return (
    <form className="auth__form" style={{ marginTop: '2rem' }} onSubmit={submitOtp}>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={5}
        inputType="number"
        containerStyle={{ direction: 'ltr', color: 'var(--color-text)' }}
        inputStyle={{ width: '100%' }}
        renderInput={(props) => <input {...props} className="otp" />}
      />

      <span className="auth__otp-desc m-top-16">
        کد تایید برای <span className="auth__otp-phone">{mobile}</span> ارسال شد
      </span>

      {showTimer ? (
        <div className="auth__otp-timer-wrapper m-top-16">
          <span>تا ارسال مجدد</span>
          <CounterDown showFullFormat={false} time={getTimer()} />
        </div>
      ) : (
        <span className="auth__otp-restore m-top-16" onClick={restoreCode}>
          ارسال مجدد کد تایید <IconLazy nameIcon="MdRestore" className="icon--r" />
        </span>
      )}

      <Button className="btn-public--green width-100 m-top-16" title="تایید" />
    </form>
  );
};

export default memo(FormOtp);
