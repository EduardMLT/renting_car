import { useEffect, useState } from 'react';

import { GlobalStyle } from 'GlobalStyle';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchImages } from '../api';
import { Loader } from './Loader/Loader';
import { StyledApp } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';

const per_page = 12;

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;

  async function DidUpdate() {
    
      try {
        setLoading(true);
        const searchQuery = query.slice(query.indexOf('/') + 1);
        const items = await fetchImages(searchQuery, page, per_page);
        const { hits, total } = items;
        const totalPages = Math.ceil(total / per_page);

        if (!hits.length) {
          toast.error('Sorry,nothing found!', {
            duration: 2000,
          });
        } else {
          setImages(prevState => (page > 1 ? [...prevState, ...hits] : hits));
          setTotalPages(totalPages);

          if (page === totalPages) {
            toast.success('That`s all images!', {
              style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#713200',
              },
              iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
              },
            });
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
    }
    }
    
    DidUpdate();
  }, [query, page]);

  const changeQuery = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
    setTotalPages(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

      
    return (
      <StyledApp>
        <Searchbar onSubmit={changeQuery} />
        {images.length > 0 && <ImageGallery images={images} />}
        {loading && <Loader />}
        {page < totalPages && <Button onClick={handleLoadMore} />}
        <Toaster />
        <GlobalStyle />
      </StyledApp>
    );
  
}
