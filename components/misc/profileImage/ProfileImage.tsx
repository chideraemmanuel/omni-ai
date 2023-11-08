'use client';

// import { getCurrentUser } from '@/lib/getCurrentUser';
import { StoreTypes } from '@/redux/store';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import styles from './ProfileImage.module.scss';
import { useSelector } from 'react-redux';
import { profileColors } from '@/constants';

interface Props {}

const ProfileImage: FC<Props> = () => {
  //   const user = await getCurrentUser();
  const { user } = useSelector((store: StoreTypes) => store.auth);
  const [color, setColor] = useState<any>(null);

  useEffect(() => {
    // Generate a random number between 0 and the length of the colors array
    const randomIndex = Math.floor(Math.random() * profileColors.length);

    // Return the color at the random index
    // profileColors[randomIndex]
    setColor(randomIndex);
  }, []);

  return (
    <>
      {user?.profile_image ? (
        <Image src={user.profile_image} alt="" />
      ) : (
        <div
          className={styles.container}
          style={{ background: profileColors[color], color: '#fff' }}
        >
          {/* {user?.name?.charAt(0)} */}
          {user?.first_name?.charAt(0)}
        </div>
      )}
    </>
  );
};

export default ProfileImage;
