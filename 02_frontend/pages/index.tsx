// pages/index.tsx
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    setOpen(true);
  };

  const handleClose = async() => {
    setOpen(false);
  };

  const handleProceed = () => {
    // ここで条件を追加して、遷移を制御する
    if (username === 'xx') {
      router.push('/top');
    } else {
      handleClose();
    }
  };
  
  return (
    <div>
      <h1>Landing Page</h1>
      <Button variant="contained" onClick={handleLogin}>
        ログイン
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ログイン</DialogTitle>
        <DialogContent>
          <TextField
            label="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleProceed}>続行</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LandingPage;
