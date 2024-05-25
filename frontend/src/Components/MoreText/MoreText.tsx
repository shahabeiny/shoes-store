import { FC, memo, useState } from 'react';
import './MoreText.css';
import IconLazy from 'Components/Icon/IconLazy';

interface MoreTextProps {
  text: string;
  maxChars?: number;
}

const MoreText: FC<MoreTextProps> = ({ text, maxChars = 270 }) => {
  const [expanded, setExpanded] = useState(false);

  const truncatedText = expanded ? text : text.slice(0, maxChars);
  const shouldShowButton = text.length > maxChars;

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="more-text">
      <p className="more-text__desc">
        {truncatedText}
        {shouldShowButton && (
          <div className="more-text__icon-wrapper" onClick={toggleExpansion}>
            {expanded ? (
              <IconLazy nameIcon='MdKeyboardArrowUp' className='more-text__icon'/>
            ) : (
              <IconLazy nameIcon='MdKeyboardArrowDown' className='more-text__icon'/>
            )}
          </div>
        )}
      </p>
    </div>
  );
};

export default memo(MoreText);
