import {React, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../../useAuth';
import {submitError} from '../../api/api';
import './style.scss';

function Comment() {
  const auth = useAuth();
  const history = useHistory();

  const [success, setSuccess] = useState(false);

  const handleClick = (e) => {
    // close model if the user clicks on the overlay and not the model itself
    if (e.target.id === 'model-overlay') {
      auth.setErrorModel(false);
      history.push('/');
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);

    if (auth.errorMessage) {
      submitError(auth.errorMessage).then(() => {
        setSuccess(true);
      }).catch(() => {
        setSuccess(false);
      });
    }

    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div id="model-overlay">
      <div id="error-model">
        <div className="model-head">
          <h1>Error</h1>
        </div>
        <div className="model-body">
          {auth.errorMessage}
        </div>
        <div className="model-foot">
          {success ? 'Error submitted to admin' : ''}
        </div>
      </div>
    </div>
  );
}

export default Comment;