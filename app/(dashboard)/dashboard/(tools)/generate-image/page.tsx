'use client';

import ImageCard from '@/components/ui/imageCard/ImageCard';
import SelectField from '@/components/ui/selectField/SelectField';
import { FC, FormEvent } from 'react';
import {
  GenerationConfig,
  GenerationOutput,
  ImageGenerationContainer,
} from './page.styled';
import TextInput from '@/components/ui/textInput/TextInput';
import { useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import {
  setAmount,
  setPrompt,
  setSize,
} from '@/redux/slices/image-generation/imageGenerationSlice';
import Button from '@/components/ui/button/Button';
import Image from 'next/image';
import empty from '@/assets/empty.svg';
import { imageNumberList, sizeList } from '@/constants';
import { useGenerateImage } from '@/lib/hooks/useGenerateImage';

interface Props {}

const ImageGenerationPage: FC<Props> = () => {
  const {
    prompt,
    size,
    amount,
    isLoading: isGenerating,
    images,
  } = useSelector((store: StoreTypes) => store.imageGeneration);

  const { mutate: generateImage } = useGenerateImage();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    generateImage({
      prompt,
      size: size?.value as string,
      amount: amount?.value as string,
    });
  };

  return (
    <ImageGenerationContainer>
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
        {isGenerating && (
          <div className="generating">
            <div className="loader"></div>
          </div>
        )}

        {images?.length > 0 && !isGenerating && (
          <div className="image-grid">
            {images.map((image, index) => (
              <ImageCard imageSrc={image.url} key={index} />
            ))}
          </div>
        )}

        {images.length === 0 && !isGenerating && (
          <div className="no-output">
            <div>
              <Image src={empty} alt="No generation" />
            </div>
            <span>No generated images</span>
          </div>
        )}
      </GenerationOutput>
    </ImageGenerationContainer>
  );
};

export default ImageGenerationPage;
