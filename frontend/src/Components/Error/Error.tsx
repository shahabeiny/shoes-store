import { FC, ComponentType } from 'react';
import './Error.css';
import IconLazy from 'Components/Icon/IconLazy';
import { Link } from 'react-router-dom';

type ErrorWithIcon = {
  component?: never;
  icon: string;
  title?: string;
  linkReturn?:LinkReturned
};

type ErrorWithoutIcon = {
  icon?: never;
  component: ComponentType;
  title: string;
  linkReturn?:LinkReturned
};

type LinkReturned = {link:string,text:string}

type ErrorProps = ErrorWithIcon | ErrorWithoutIcon;

const Error: FC<ErrorProps> = ({ component: Componenet, title, icon,linkReturn }) => {
  return (
    <>
      <div className="error-page">
        <div className="error-page__wrapper" data-aos="zoom-in">
          {Componenet ? (
            <Componenet />
          ) : (
            <IconLazy
              nameIcon={icon}
              color="var(--color-red)"
              fontSize="5.6rem"
            />
          )}
          <span className="error-page__title">{title ? title : 'موردی یافت نشد'}</span>
          {
            linkReturn?.link && <Link to={linkReturn.link} className='m-top-16'>{linkReturn.text}</Link>
          }
        </div>
      </div>
    </>
  );
};

export default Error;
