import Lottie from 'react-lottie';
import animationData from './loadingAnimation.json';

interface LoadingProps {
  width: string;
  height: string;
}

function LoadingIcon({ width, height }: LoadingProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={width} width={height} />;
}

export default LoadingIcon;
