import styled, { css } from 'styled-components';
import { SelectFieldToggleProps, StyledListProps } from './SelectField.types';

export const StyledSelectFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme['fluid-block-space-1'] || '0.5rem'};
  position: relative;
`;

export const StyledSelectFieldToggle = styled.div<SelectFieldToggleProps>`
  input {
    display: none;

    &:checked {
      + label {
        /* border: 1px solid #d6bbfb;
        box-shadow: 0px 0px 0px 4px #f4ebff,
          0px 1px 2px 0px rgba(16, 24, 40, 0.05); */
        border: ${({ border }) => border || '1px solid #b5cff8'};
        box-shadow: ${({ focus }) =>
          `0px 0px 0px 3px ${
            focus?.boxShadowColor ? focus?.boxShadowColor : '#dee8f8'
          }, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`};

        .chevron {
          transform: rotate(-180deg);
        }
      }
    }
  }

  label {
    /* width: 20rem; */
    width: min(100%, 20rem);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) =>
      `${theme.space['fluid-block-space-2']} ${theme.space['fluid-inline-space-3']}`};
    gap: ${({ theme }) => theme.space['fluid-inline-space-1'] || '0.5rem'};
    border: 1px solid #d0d5dd;
    cursor: pointer;
    transition: 0.2s ease;
    border-radius: ${({ borderRadius }) => borderRadius || '0.5rem'};
    border: ${({ border }) => border || `1px solid #d0d5dd`};
    background: ${({ background }) => background || '#fff'};
    box-shadow: ${({ boxShadow }) =>
      boxShadow || '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'};

    &:hover {
      border: ${({ focus }) => focus?.border || '1px solid #b5cff8'};
      box-shadow: ${({ focus }) =>
        `0px 0px 0px 3px ${
          focus?.boxShadowColor ? focus?.boxShadowColor : '#dee8f8'
        }, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`};
    }
  }

  .toggle-left {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space['fluid-inline-space-1']};

    > .icon {
      display: flex;
      align-items: center;
      /* width: 1.25rem;
      height: 1.25rem; */
      width: ${({ theme }) => theme.space['fluid-inline-space-4']};
      aspect-ratio: 1 / 1;

      > * {
        width: 100%;
        height: 100%;
      }
    }

    span {
      color: #667085;
      font-size: ${({ theme }) =>
        theme.font['sm-font'] || 'clamp(0.875rem, 0.831rem + 0.1878vw, 1rem)'};
      font-style: normal;
      font-weight: 400;
      line-height: 1.5rem;

      /* overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis; */
    }
  }

  .chevron {
    // chevron
    display: flex;
    align-items: center;
    /* width: 1.25rem; */
    /* height: 1.25rem; */
    width: ${({ theme }) => theme['fluid-inline-space-4'] || '1.25rem'};
    aspect-ratio: 1 / 1;
    transition: 0.2s ease;
  }
`;

export const StyledSelectFieldList = styled.div<StyledListProps>`
  /* width: 20rem; */
  width: min(100%, 20rem);
  max-height: 20rem;
  border-radius: 0.5rem;
  border: 1px solid #f2f4f7;
  background: #fff;
  box-shadow: 0px 4px 6px -2px rgba(16, 24, 40, 0.03),
    0px 12px 16px -4px rgba(16, 24, 40, 0.08);
  position: absolute;
  z-index: 5;
  top: 90%;
  visibility: hidden;
  opacity: 0;
  transition: 200ms ease;

  ${({ active }) =>
    active &&
    css`
      /* margin-top: 0.5rem; */
      top: calc(100% + 0.5rem);
      visibility: visible;
      opacity: 1;
    `}
`;

export const StyledSelectFieldListItem = styled.div`
  input {
    display: none;

    &:checked {
      + label {
        background: #f9fafb;

        .check {
          display: inline-block;
          color: #2b3467;
        }
      }
    }
  }

  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.625rem 0.875rem;
    gap: ${({ theme }) => theme['fluid-inline-space-1'] || '0.5rem'};
    transition: 0.1s ease;
    cursor: pointer;

    &:hover {
      background: #f9fafb;
    }
  }

  .item-left {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme['fluid-inline-space-1'] || '0.5rem'};

    .icon {
      /* width: 1.25rem;
      height: 1.25rem; */
      width: ${({ theme }) => theme['fluid-inline-space-4'] || '1.25rem'};
      aspect-ratio: 1 / 1;

      > * {
        width: 100%;
        height: 100%;
      }
    }
  }

  .check {
    display: none;
  }
`;

// export const StyledSelectFieldOverlay = styled.div`

// `
