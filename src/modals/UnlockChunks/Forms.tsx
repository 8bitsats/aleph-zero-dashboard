// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import { useState, useEffect, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useModal } from 'contexts/Modal';
import { useBalances } from 'contexts/Balances';
import { useApi } from 'contexts/Api';
import { useConnect } from 'contexts/Connect';
import { useSubmitExtrinsic } from 'library/Hooks/useSubmitExtrinsic';
import { Warning } from 'library/Form/Warning';
import { useStaking } from 'contexts/Staking';
import { planckBnToUnit } from 'Utils';
import { APIContextInterface } from 'types/api';
import { ContentWrapper } from './Wrappers';
import { FooterWrapper, Separator, NotesWrapper } from '../Wrappers';

export const Forms = forwardRef(
  ({ setSection, unlock, task }: any, ref: any) => {
    const { api, network } = useApi() as APIContextInterface;
    const { activeAccount } = useConnect();
    const { getControllerNotImported, staking } = useStaking();
    const { setStatus: setModalStatus }: any = useModal();
    const { getBondedAccount }: any = useBalances();
    const { historyDepth } = staking;
    const { units } = network;
    const controller = getBondedAccount(activeAccount);

    // valid to submit transaction
    const [valid, setValid]: any = useState(
      unlock?.value?.toNumber() > 0 ?? false
    );

    // ensure unlock value is valid
    useEffect(() => {
      setValid(unlock?.value?.toNumber() > 0 ?? false);
    }, [unlock]);

    // tx to submit
    const tx = () => {
      let _tx = null;
      if (!valid || !api) {
        return _tx;
      }
      if (task === 'rebond') {
        _tx = api.tx.staking.rebond(unlock.value.toNumber());
      } else {
        _tx = api.tx.staking.withdrawUnbonded(historyDepth);
      }
      return _tx;
    };

    const { submitTx, estimatedFee, submitting }: any = useSubmitExtrinsic({
      tx: tx(),
      from: controller,
      shouldSubmit: valid,
      callbackSubmit: () => {
        setModalStatus(0);
      },
      callbackInBlock: () => {},
    });

    const value = unlock?.value ?? new BN(0);

    return (
      <ContentWrapper>
        <div ref={ref} style={{ paddingBottom: '1rem' }}>
          <div>
            {getControllerNotImported(controller) && (
              <Warning text="You must have your controller account imported to stop nominating." />
            )}

            {task === 'rebond' && (
              <h2>
                Rebond {planckBnToUnit(value, units)} {network.unit}
              </h2>
            )}
            {task === 'withdraw' && (
              <h2>
                Withdraw {planckBnToUnit(value, units)} {network.unit}
              </h2>
            )}
            <Separator />
            <NotesWrapper>
              <p>
                Estimated Tx Fee:
                {estimatedFee === null ? '...' : `${estimatedFee}`}
              </p>
            </NotesWrapper>
          </div>
          <FooterWrapper>
            <div>
              <button
                type="button"
                className="submit"
                onClick={() => setSection(0)}
              >
                <FontAwesomeIcon transform="shrink-2" icon={faChevronLeft} />
                Back
              </button>
            </div>
            <div>
              <button
                type="button"
                className="submit"
                onClick={() => submitTx()}
                disabled={
                  !valid || submitting || getControllerNotImported(controller)
                }
              >
                <FontAwesomeIcon
                  transform="grow-2"
                  icon={faArrowAltCircleUp as IconProp}
                />
                Submit
              </button>
            </div>
          </FooterWrapper>
        </div>
      </ContentWrapper>
    );
  }
);
