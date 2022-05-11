import React, { useEffect } from 'react';

import { Box } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  frame: {
    padding: '20px',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 9999999,
    textAlign: 'center',
    transition: 'all .8s',
  },
  error: {
    backgroundColor: '#FE5F55',
    color: '#fff',
  },
  success: { backgroundColor: '#010101', color: '#5DFC70' },
  show: {
    transform: 'translateY(0)',
  },
  hide: {
    transform: 'translateY(-200%)',
  },
}));

interface NotificationProps {
  type: string;
  text?: string;
  show?: boolean;
  setNoti: any;
}

const Notification = ({ type, text, show, setNoti }: NotificationProps) => {
  const classes: any = useStyles();

  useEffect(() => {
    let timer: any;
    if (show) {
      timer = setTimeout(() => {
        return setNoti({
          type: '',
          text: '',
          show: false,
        });
      }, 4000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [show, setNoti]);

  return (
    <Box
      className={`${classes.frame} ${classes[type]} ${
        show ? classes.show : classes.hide
      }`}
    >
      {text}
    </Box>
  );
};

export default Notification;
