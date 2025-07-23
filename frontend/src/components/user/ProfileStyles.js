// styles/githubProfileStyles.js
import { grey } from '@mui/material/colors';

export const styles = {
  container: {
    backgroundColor: '#0d1117',
    color: 'white',
    minHeight: '100vh',
  },
  appBar: {
    backgroundColor: '#161b22',
  },
  logoText: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    marginRight: '8px',
  },
  navLinks: {
    display: 'flex',
    gap: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    margin: '0 auto',
    bgcolor: grey[700],
  },
  username: {
    mt: 2,
    color: 'lightblue',
    padding: '16px 0'
  },
  followButton: {
    mt: 2,
    backgroundColor: '#21262d',
    color: 'white',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#30363d',
    },
  },
  followerContainer: {
    padding: '16px 0',
    display: 'flex',
    justifyContent: 'center',
    gap: 2,
    mt: 2,
  },
  followerButton: {
    color: 'lightblue',
    fontWeight: 'bold',
    textTransform: 'none',
  },
  logoutButton: {
    backgroundColor: '#21262d',
    color: 'white',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#30363d',
    },
    mt: 2,
    mb: 2,
  },
};
