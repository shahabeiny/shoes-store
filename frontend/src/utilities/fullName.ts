const getFullName = (name:string,family:string): string => {
  let fullName = '';
  if (name || family) {
    fullName = `${name} ${family}`;
  } else {
    fullName = '_';
  }
  return fullName;
};

export default  getFullName;