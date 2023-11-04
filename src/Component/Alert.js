import React, { useContext } from 'react';
import AlertContext from '../Context/Notes/AlertContext';

const Alert = () => {
  const context = useContext(AlertContext);
  const { alert } = context;

  return (
    <>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.msg}
        </div>
      )}
    </>
  );
};

export default Alert;
