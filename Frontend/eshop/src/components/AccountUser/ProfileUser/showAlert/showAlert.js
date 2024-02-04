import React from 'react'
import { Stack, Alert, Button, Snackbar } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

export const sendMessageForUser = message =>  toast.success(message, {

            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }  );
          
  
