import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './App.css';
import { animateScroll as scroll } from 'react-scroll';

import pixabayApi from './ApiService/ApiService';
import ImagesErrorView from './components/ImagesErrorView';
// import ImagePendingView from './components/ImagePendingView';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Searchbar from './components/SearchBar/SearchBar';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [requestKey, setRequestKey] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  const handleFormSubmit = newRequestKey => {
    if (newRequestKey === requestKey) {
      return;
    }
    setRequestKey(newRequestKey);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!requestKey) {
      return;
    }

    const renderImages = () => {
      setStatus(Status.PENDING);

      pixabayApi
        .fetchImages(requestKey, page)
        .then(images => setImages(prevState => [...prevState, ...images]))
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        })
        .finally(() => setStatus(Status.RESOLVED));
    };

    renderImages();
    scroll.scrollToBottom();
  }, [requestKey, page]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      <ToastContainer autoClose={3000} />
      {status === Status.IDLE && (
        <p className="welcomeText">Please enter your search term</p>
      )}
      {status === Status.REJECTED && (
        <ImagesErrorView message={error.message} />
      )}
      {images.length > 0 && <ImageGallery images={images} />}

      {status === Status.RESOLVED && <Button onClick={onLoadMore} />}

      {status === Status.PENDING && (
        <Loader
          style={{ textAlign: 'center' }}
          className="Loader"
          type="ThreeDots"
          color="#303f9f"
          height={50}
          width={50}
        />
      )}
    </>
  );
}

App.propTypes = {
  requestKey: PropTypes.string,
  page: PropTypes.number,
  images: PropTypes.array,
};