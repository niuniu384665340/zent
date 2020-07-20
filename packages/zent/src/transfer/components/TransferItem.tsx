import * as React from 'react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import cx from 'classnames';

import { I18nReceiver as Receiver, II18nLocaleCascader } from '../../i18n';
import { Grid, Input, Checkbox } from '../../index';
import { ITransferItem } from '../types';
import { IGridColumn } from '../../grid';

const TransferItem: React.FC<ITransferItem> = ({
  prefix,
  title,
  datasets,
  selectedRowKeys,
  selection,
  changeSelectedRowKeys,
  rowKey,
  filterOption,
  showSearch,
  columns,
  searchPlaceholder,
  onRowClick,
  emptyLabel,
  ...gridRest
}) => {
  const classNamePrefix = `${prefix}__item`;
  const [inputVal, setInputVal] = useState('');
  const [listData, setListData] = useState(datasets);
  const checked =
    selectedRowKeys.length &&
    selectedRowKeys.length ===
      listData.filter(({ disabled }) => !disabled).length;
  const indeterminate = selectedRowKeys.length && !checked;

  const onSelect = useCallback(
    keys => {
      changeSelectedRowKeys(keys);
    },
    [changeSelectedRowKeys]
  );

  const getCheckboxProps = ({ disabled }: { disabled: boolean }) => ({
    disabled,
  });

  const changeCheckBox = useCallback(() => {
    if (selectedRowKeys.length === 0 || indeterminate) {
      changeSelectedRowKeys(
        listData
          .filter(({ disabled }) => !disabled)
          .map(({ [rowKey]: key }) => key)
      );
      return;
    }
    changeSelectedRowKeys([]);
  }, [changeSelectedRowKeys, listData, indeterminate, selectedRowKeys, rowKey]);

  const changeInput = useCallback(e => {
    const val = e.target.value;
    setInputVal(val);
  }, []);

  const Title = useMemo(() => {
    if (selectedRowKeys.length > 0) {
      return title
        ? `${title}（${selectedRowKeys.length}/${listData.length}）`
        : `${selectedRowKeys.length}/${listData.length}`;
    }
    return title ? `${title}（${listData.length}）` : listData.length;
  }, [title, listData, selectedRowKeys]);

  const handleRowClick = useCallback(
    (data, index, event) => {
      const key = data[rowKey];
      onRowClick && onRowClick(data, index, event);
      changeSelectedRowKeys(
        selectedRowKeys.includes(key)
          ? selectedRowKeys.filter(item => key !== item)
          : selectedRowKeys.concat(key)
      );
    },
    [onRowClick, changeSelectedRowKeys, selectedRowKeys, rowKey]
  );

  useEffect(() => {
    setListData(
      showSearch && filterOption
        ? datasets.filter(item => filterOption(inputVal, item))
        : datasets
    );
  }, [datasets, filterOption, inputVal, showSearch]);

  const girdColumns = useMemo(() => {
    const res = columns[0]?.title
      ? columns
      : columns.map(item => ({ ...item, title: '' }));
    return res as IGridColumn<any>[];
  }, [columns]);

  return (
    <Receiver componentName="Transfer">
      {(i18n: II18nLocaleCascader) => {
        return (
          <div className={classNamePrefix}>
            <div className={`${classNamePrefix}__allCheckbox`}>
              {columns[0]?.title ? (
                Title
              ) : (
                <Checkbox
                  checked={checked}
                  indeterminate={indeterminate}
                  onChange={changeCheckBox}
                >
                  {Title}
                </Checkbox>
              )}
            </div>

            {showSearch && (
              <div className={`${classNamePrefix}__search`}>
                <Input
                  placeholder={searchPlaceholder || i18n.placeholder}
                  icon="search"
                  onChange={changeInput}
                  value={inputVal}
                  showClear
                />
              </div>
            )}
            <Grid
              className={cx(`${classNamePrefix}__grid`, {
                [`${classNamePrefix}__header--hidden`]:
                  false === !!columns[0]?.title,
              })}
              rowClassName={`${classNamePrefix}__grid__row`}
              datasets={listData}
              rowKey={rowKey}
              selection={{
                selectedRowKeys,
                onSelect,
                getCheckboxProps,
                ...selection,
              }}
              columns={girdColumns}
              onRowClick={handleRowClick}
              emptyLabel={emptyLabel || '暂无数据'}
              {...gridRest}
            />
          </div>
        );
      }}
    </Receiver>
  );
};

TransferItem.defaultProps = {
  scroll: { y: 240, x: 0 },
};

export default TransferItem;
