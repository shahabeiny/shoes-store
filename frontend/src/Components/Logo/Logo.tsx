import { memo } from 'react';
import './Logo.css';
import { Link } from 'react-router-dom';

const Logo = ({showTitle=false}:{showTitle?:boolean}) => {
  return (
    <Link to="/" className="logo">
      <img src="/images/logo2.png" alt="shahab store" className="logo__img" />
     { showTitle && <span className="logo__name">𝙨𝙝𝙖𝙝𝙖𝙗 𝙨𝙩𝙤𝙧𝙚</span>}
    </Link>
  );
};

export default memo(Logo);
