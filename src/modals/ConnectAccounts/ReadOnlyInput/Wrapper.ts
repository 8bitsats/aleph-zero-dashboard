// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import { borderPrimary } from 'theme';

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 0.5rem;

  .input {
    border: 1px solid ${borderPrimary};
    border-radius: 1rem;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 0.25rem 0.5rem 0.25rem 1rem;

    > section {
      display: flex;
      flex-flow: column wrap;

      > input {
        width: 100%;
        border: none;
        padding-right: 1rem;
      }

      &:first-child {
        flex: 1;
      }
    }
  }
  h5 {
    margin: 0.75rem 0.25rem;
    &.neutral {
      color: var(--text-color-secondary);
      opacity: 0.8;
    }
    &.danger {
      color: var(--text-color-danger);
    }
    &.success {
      color: var(--text-color-success);
    }
  }
`;
