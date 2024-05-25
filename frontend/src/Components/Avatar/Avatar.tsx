import { FC, memo } from 'react';
import IconLazy from 'Components/Icon/IconLazy';
import apiUrl from 'services/apiUrl';

type AvatarProps = {
  onClick?: () => void;
  path: string;
  size?: string;
  className?: string;

};


const Avatar: FC<AvatarProps> = ({  path,size="4.5rem", className, onClick }) => {
  return (
    <div onClick={() => onClick?.()} data-aos="zoom-in">
      {path ? (
        <img
          style={{ height:size, width:size, borderRadius: '50%' }}
          src={`${apiUrl}/${path}`}
          alt="avatar"
          className={className ? className : ''}
        />
      ) : (
        <IconLazy nameIcon="LuUserCircle2" fontSize={size} />
      )}
    </div>
  );
};

export default memo(Avatar);
