import { Component } from 'react';

import { GlobalStyle } from 'GlobalStyle';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchImages } from '../api';
import { Loader } from './Loader/Loader';
import { StyledApp } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';

const per_page = 12;

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    totalPages: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true });
        const searchQuery = query.slice(query.indexOf('/') + 1);
        const items = await fetchImages(searchQuery, page, per_page);
        const { hits, total } = items;
        const totalPages = Math.ceil(total / per_page);

        if (!hits.length) {
          toast.error('Sorry,nothing found!', {
            duration: 2000,
          });
        } else {
          this.setState(prevState => ({
            images: page > 1 ? [...prevState.images, ...hits] : hits,
            totalPages,
          }));

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
        this.setState({ loading: false });
      }
    }
  }

  changeQuery = newQuery => {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1,
      totalPages: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loading, page, totalPages } = this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.changeQuery} />
        {images.length > 0 && <ImageGallery images={images} />}
        {loading && <Loader />}
        {page < totalPages && <Button onClick={this.handleLoadMore} />}
        <Toaster />
        <GlobalStyle />
      </StyledApp>
    );
  }
}