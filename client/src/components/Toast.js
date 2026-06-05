import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

function Toast() {
  const { notification, clearNotification } = useContext(GlobalContext);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(clearNotification, 3000);
    return () => clearTimeout(timer);
  }, [notification, clearNotification]);

  if (!notification) return null;

  return (
    <div className={`toast toast-${notification.type}`}>
      <span className="toast-icon">
        {notification.type === 'success' ? '✓' : '✕'}
      </span>
      {notification.message}
    </div>
  );
}

export default Toast;
