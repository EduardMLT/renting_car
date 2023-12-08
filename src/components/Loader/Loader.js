import { ThreeCircles } from 'react-loader-spinner';

import { LoaderDiv } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderDiv>
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#6aa290"
        innerCircleColor="#8bdfc3"
        middleCircleColor="#6aa290"
      />
    </LoaderDiv>
  );
};
