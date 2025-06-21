import topography from '../assets/images/topography.svg';

export const Background = () => {
    return (
        <div className="bg">
            <img src={topography} draggable={false} alt="Background Image" id="globalbackgroundimage" />
        </div>
    );
};