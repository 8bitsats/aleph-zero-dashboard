// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useState } from 'react';
import { useCombobox } from 'downshift';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'contexts/Themes';
import { defaultThemes } from 'theme/default';
import { StyledDownshift, StyledDropdown } from '../AccountDropdown/Wrappers';

export const Dropdown = (props: any) => {
  const { items, onChange, label, placeholder, value, current }: any = props;

  const [inputItems, setInputItems] = useState(items);

  const itemToString = (item: any) => item?.name ?? '';

  const c: any = useCombobox({
    items: inputItems,
    itemToString,
    onSelectedItemChange: onChange,
    initialSelectedItem: value,
    onInputValueChange: ({ inputValue }: any) => {
      setInputItems(items);
    },
  });

  return (
    <StyledDownshift>
      <div>
        {label && (
          <div className="label" {...c.getLabelProps()}>
            {label}
          </div>
        )}
        <div style={{ position: 'relative' }}>
          <div className="current">
            <div className="input-wrap selected">
              <input className="input" disabled value={current?.name ?? ''} />
            </div>
            <span>
              <FontAwesomeIcon icon={faAnglesRight} />
            </span>
            <div className="input-wrap selected" {...c.getComboboxProps()}>
              <input
                className="input"
                disabled
                {...c.getInputProps({ placeholder })}
                value={value?.name ?? '...'}
              />
            </div>
          </div>

          <StyledDropdown {...c.getMenuProps()}>
            <div className="items">
              {inputItems.map((item: any, index: number) => (
                <DropdownItem
                  key={`controller_acc_${index}`}
                  c={c}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </StyledDropdown>
        </div>
      </div>
    </StyledDownshift>
  );
};

const DropdownItem = ({ c, item, index }: any) => {
  const { mode } = useTheme();
  const color =
    c.selectedItem?.key === item.key
      ? defaultThemes.primary[mode]
      : defaultThemes.text.primary[mode];
  const border =
    c.selectedItem?.key === item.key
      ? `2px solid ${defaultThemes.primary[mode]}`
      : `2px solid ${defaultThemes.transparent[mode]}`;

  return (
    <div
      className="item"
      {...c.getItemProps({ key: item.name, index, item })}
      style={{
        color,
        border,
      }}
    >
      <p>{item.name}</p>
    </div>
  );
};

export default Dropdown;
