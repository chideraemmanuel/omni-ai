'use client';

import ImageCard from '@/components/ui/imageCard/ImageCard';
import SelectField from '@/components/ui/selectField/SelectField';
import { FC, FormEvent } from 'react';
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
import { generateImage } from '@/redux/slices/image-generation/imageGenerationService';
import { imageNumberList, sizeList } from '@/constants';
import { useGenerateImage } from '@/lib/hooks/useGenerateImage';

interface Props {}

const ImageGenerationPage: FC<Props> = () => {
  const {
    prompt,
    size,
    amount,
    isLoading: isGenerating,
    isSuccess,
    isError,
    error,
    images,
  } = useSelector((store: StoreTypes) => store.imageGeneration);

  const dispatch = useDispatch();

  const { mutate: generateImage } = useGenerateImage();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    generateImage({
      prompt,
      size: size?.value,
      amount: amount?.value,
    });
  };

  return (
    <ImageGenerationContainer>
      {/* <span>Image generation!</span> */}
      {/* <ImageCard /> */}

      <GenerationConfig onSubmit={(e) => handleSubmit(e)}>
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
        {isGenerating && <p>Generating Images...</p>}

        {images?.length > 0 && (
          <div className="image-grid">
            {images.map((image, index) => (
              <ImageCard imageSrc={image.url} key={index} />
            ))}
          </div>
        )}

        {images.length === 0 && (
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
