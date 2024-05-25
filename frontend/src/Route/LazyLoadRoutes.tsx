import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import { lazy, Suspense } from 'react';


export const LazyLoadRoutes = (componentName: string) =>{
  const LazyElement = lazy(() =>import(`../Pages/${componentName}.tsx`));

  return (
    <Suspense fallback={<CircleSpinner />}>
      <LazyElement />
    </Suspense>
  );
}
