import { TextField } from '@mui/material';
import styles from './Searchbar.module.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export const Searchbar: React.FC = () => {
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBarBox}>
        <TextField
          className={styles.searchBar}
          size="small"
          variant="outlined"
          label="Search products"
          type="search"
        />
        <button className={styles.searchCart}>
          <ShoppingCartOutlinedIcon />
        </button>
      </div>
    </div>
  );
};
