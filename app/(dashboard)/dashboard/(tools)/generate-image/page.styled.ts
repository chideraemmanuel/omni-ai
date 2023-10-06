import styled from 'styled-components';

export const ImageGenerationContainer = styled.div`
  /* background-color: blue; */
  /* height: calc(100vh - ${({ theme }) =>
    theme.space['fluid-block-space-17']}); */
  width: 100%;
  padding: ${({ theme }) =>
    `${theme.space['fluid-block-space-5']} ${theme.space['fluid-inline-space-5']}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['fluid-block-space-2']};
`;

export const GenerationConfig = styled.form`
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.light['gray-500']};
  border-radius: 0.5rem;
  padding: ${({ theme }) =>
    `${theme.space['fluid-block-space-5']} ${theme.space['fluid-inline-space-3']}`};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['fluid-inline-space-2']};

  > *:first-child {
    flex: 1;
  }

  > *:nth-child(2) {
    /* background-color: red; */
    display: flex;
    align-items: center;
    /* display: grid;
    grid-template-columns: 1fr 1fr auto; */
    gap: ${({ theme }) => theme.space['fluid-inline-space-2']};

    @media screen and (max-width: 1024px) {
      flex-direction: column;
      align-items: stretch;
    }

    @media screen and (max-width: 820px) {
      flex-direction: row;
    }

    @media screen and (max-width: 540px) {
      flex-direction: column;
    }

    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.space['fluid-inline-space-2']};
      width: 100%;

      @media screen and (max-width: 1024px) {
        display: grid !important;
        grid-template-columns: 1fr 1fr;
      }

      @media screen and (max-width: 400px) {
        grid-template-columns: 1fr;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const GenerationOutput = styled.section`
  flex: 1;
  overflow: scroll;
  overflow-x: hidden;
  /* background-color: red; */

  &::-webkit-scrollbar {
    width: 5px;
    opacity: 0;
    transition: 0.5s ease;
  }

  &:hover {
    &::-webkit-scrollbar {
      opacity: 1;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.light['gray-700']};
    }
  }

  .image-grid {
    /* background-color: red; */
    min-height: 60vh;
    padding: 30px 20px;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    align-items: flex-start;
    gap: ${({ theme }) => theme.space['fluid-inline-space-4']};
  }

  .no-output {
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 60vh;
    padding: ${({ theme }) =>
      `${theme.space['fluid-block-space-5']} ${theme.space['fluid-inline-space-3']}`};

    > div {
      width: min(80%, 300px);
      aspect-ratio: 1 / 1;

      img {
        width: 100%;
        height: 100%;
      }
    }

    > span {
      color: ${({ theme }) => theme.colors.light['gray-800']};
      font-size: ${({ theme }) => theme.font['sm-font']};
    }
  }
`;
