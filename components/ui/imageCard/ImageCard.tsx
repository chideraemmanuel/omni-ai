'use client';

import Image from 'next/image';
import { FC } from 'react';
import { CardImage, ImageCardContainer } from './ImageCard.styled';
import Button from '@/components/ui/button/Button';
import { FiDownload } from 'react-icons/fi';
import { saveAs } from 'file-saver';

import image from '@/assets/profile.jpg';

interface Props {
  imageSrc: any;
}

const ImageCard: FC<Props> = ({ imageSrc }) => {
  const downloadImage = (fileUrl: string) => {
    saveAs(fileUrl, 'OmniAI_image.jpg');
  };

  return (
    <ImageCardContainer>
      <CardImage>
        <Image src={imageSrc} alt="" width={300} height={300} />
      </CardImage>

      <Button
        tagType="button"
        width="100%"
        borderRadius="5px"
        onClick={() => downloadImage(imageSrc)}
      >
        <FiDownload />
        <span>Download</span>
      </Button>
    </ImageCardContainer>
  );
};

export default ImageCard;
