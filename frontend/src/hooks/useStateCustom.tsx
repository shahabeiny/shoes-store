import React, { useState } from 'react';

const useStateCustom = (init: boolean = false): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [value, setValue] = useState<boolean>(init);
  return [value, setValue];
};

export default useStateCustom;