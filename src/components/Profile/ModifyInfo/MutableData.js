import { FaPhoneAlt } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import styles from '../../../styles/Profile/ModifyInfo.module.scss';

const MutableData = ({ userInfo, setEmail, setPhoneNumber }) => {
  return (
    <div className={styles.mutable}>
      <div className={styles.email}>
        <IoIosMail />
        <input
          placeholder={userInfo.email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className={styles.phone}>
        <FaPhoneAlt />
        <input
          placeholder={userInfo.phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MutableData;
