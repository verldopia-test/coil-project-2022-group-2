import React from 'react';
import { TextField, Button } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import { ROUTES } from '../../../constants/routes';

export const AdminLoginForm: React.FC = () => {
  return (
    <form className="form-container" action="">
      <div className="form-box">
        <h2 className="form-title">Administrator Login</h2>
        <div className="form-box-s">
          <TextField
            className="form-input"
            size="small"
            variant="outlined"
            label="Username"
            type="text"
          />
        </div>
        <div className="form-box-s">
          <TextField
            className="form-input"
            size="small"
            variant="outlined"
            label="Password"
            type="password"
          />
        </div>
        <div className="form-btn">
          <Button
            variant="contained"
            startIcon={<CheckOutlinedIcon />}
            href={ROUTES.ADMIN}
          >
            Login
          </Button>
          <Button className="form-btn--password" variant="text">
            {<QuestionMarkOutlinedIcon />}
          </Button>
        </div>
      </div>
    </form>
  );
};
