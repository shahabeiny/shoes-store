import { HelmetProvider } from 'react-helmet-async';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './Redux/store';
import { BrowserRouter } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from 'Components/Error/ErrorBoundaryFallback';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={() => {
            //Reset the state of your app
          }}>
          <App />
        </ErrorBoundary>
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);
