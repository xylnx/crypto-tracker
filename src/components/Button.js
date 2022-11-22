import { Link } from 'react-router-dom';

const Button = ({ btnDest, btnCopy }) => {
  return (
    <Link to={btnDest} type="button" className="btn btn-link">
      {btnCopy}
    </Link>
  );
};

export { Button };
