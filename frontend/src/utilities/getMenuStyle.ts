export  const getMenuStyle = (isActive: boolean) => {
  return isActive
    ? {
        backgroundColor: 'var(--color-white)',
        color: 'var(--color-green)'
      }
    : {};
};