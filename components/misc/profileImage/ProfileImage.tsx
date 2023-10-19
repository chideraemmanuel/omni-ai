import { getCurrentUser } from '@/lib/getCurrentUser';
import { StoreTypes } from '@/redux/store';
import Image from 'next/image';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { StyledProfileImage } from './ProfileImage.styled';

interface Props {}

const ProfileImage: FC<Props> = () => {
  //   const user = await getCurrentUser();
  const { user } = useSelector((store: StoreTypes) => store.auth);

  return (
    <>
      {user?.profileImage ? (
        <Image src={user.profileImage} alt="" />
      ) : (
        <StyledProfileImage>{user?.name?.charAt(0)}</StyledProfileImage>
      )}
    </>
  );
};

export default ProfileImage;
