import { AiOutlineSearch } from 'react-icons/ai';
import toast from 'react-hot-toast';

import {
  StyledSearchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  return (
    <StyledSearchbar>
      <SearchForm
        onSubmit={event => {
          event.preventDefault();
          if (event.target.elements.query.value.trim() === '') {
            toast.error('Please enter key word for search!', {
              duration: 2000,
            });
            return;
          }
          onSubmit(event.target.elements.query.value);
          event.target.reset();
        }}
      >
        <SearchFormBtn type="submit">
          <AiOutlineSearch size={20} />
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          name="query"
          placeholder="Search images and photos"
          required
        />
      </SearchForm>
    </StyledSearchbar>
  );
};
