// import { animateScroll as scroll } from 'react-scroll';
import PropTypes from 'prop-types';

export default function Button({ onClick }) {
  const scrollFunction = () => {
    onClick();
    // scroll.scrollToBottom();
  };

  return (
    <button onClick={scrollFunction} className="Button" type="button">
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};