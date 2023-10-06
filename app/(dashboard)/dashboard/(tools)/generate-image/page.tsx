'use client';

import ImageCard from '@/components/ui/imageCard/ImageCard';
import SelectField from '@/components/ui/selectField/SelectField';
import { FC } from 'react';
import { FiUser, FiUserPlus } from 'react-icons/fi';
import {
  GenerationConfig,
  GenerationOutput,
  ImageGenerationContainer,
} from './page.styled';
import TextInput from '@/components/ui/textInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import {
  setAmount,
  setPrompt,
  setSize,
} from '@/redux/slices/image-generation/imageGenerationSlice';
import Button from '@/components/ui/button/Button';
import Image from 'next/image';
import illustration from '@/assets/illustration.svg';

interface Props {}

const imageNumberList = [
  {
    title: '1 image',
    value: '1',
  },
  {
    title: '2 images',
    value: '2',
  },
  {
    title: '3 images',
    value: '3',
  },
  {
    title: '4 images',
    value: '4',
  },
];

const sizeList = [
  {
    title: '256 x 256',
    value: '256',
  },
  {
    title: '512 x 512',
    value: '512',
  },
  {
    title: '1024 x 1024',
    value: '1024',
  },
];

const ImageGenerationPage: FC<Props> = () => {
  const { prompt, size, amount } = useSelector(
    (store: StoreTypes) => store.imageGeneration
  );

  return (
    <ImageGenerationContainer>
      {/* <span>Image generation!</span> */}
      {/* <ImageCard /> */}

      <GenerationConfig>
        <div>
          <TextInput
            placeholder="Enter a prompt"
            value={prompt}
            setValue={setPrompt}
          />
        </div>

        <div>
          <div>
            <SelectField
              id="image-size"
              placeholder="Image size"
              list={sizeList}
              state={{ selectedOption: size, setSelectedOption: setSize }}
            />

            <SelectField
              id="image-amount"
              placeholder="Number of images"
              list={imageNumberList}
              state={{ selectedOption: amount, setSelectedOption: setAmount }}
            />
          </div>

          <Button size="lg" fontSize="sm" tagType="button">
            Generate
          </Button>
        </div>
      </GenerationConfig>

      <GenerationOutput>
        {false && (
          <div className="image-grid">
            <ImageCard />
            <ImageCard />
            <ImageCard />
          </div>
        )}

        {true && (
          <div className="no-output">
            <div>
              <Image src={illustration} alt="No generation" />
            </div>
            <span>No generated images</span>
          </div>
        )}
      </GenerationOutput>
    </ImageGenerationContainer>
  );
};

export default ImageGenerationPage;
