import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import HightLight, { transferHighLight } from '../highlight';
import { isMatch } from './utils';
import './index.scss';
import VirtualList from './components/virtualList';

type IDataItem = {
  [key: string]: any;
  key?: string;
}

export type IColumns = {
  title: string;
  dataIndex: string;
  key?: string;
  render?: (info: { // 自定义渲染器
    value: any;
    completeValue: IDataItem;
    index: number;
    searchValue: string;
  }) => React.ReactNode;
  searcher?: (info: { // 自定义筛选器
    value: any;
    completeValue: IDataItem;
    index: number;
    searchValue: string;
  }) => boolean;
}[];

export type IDataSource = IDataItem[];

interface IProps {
  columns: IColumns;
  dataSource: IDataSource;
  searchValue?: string;
  loading?: boolean;
}

const Table: React.FC<IProps> = ({ columns = [], dataSource = [], searchValue, loading }) => {

  const ref = useRef(null);
  const [top, setTop] = useState(0); // 记录距离顶部的距离 用于计算表格自动占据剩余高度

  useLayoutEffect(() => {
    if (ref.current) {
      const { top } = ref.current.getBoundingClientRect();
      setTop(top);
    }
  }, []);

  // 渲染单元格
  const renderCell = useCallback((column, data, index) => {
    const { dataIndex, render } = column;
    if (render && typeof render === 'function') {
      return render({
        value: data[dataIndex],
        completeValue: data,
        searchValue,
        index
      });
    }
    const value = data[dataIndex];
    if (searchValue && value) {
      return <HightLight textList={transferHighLight(data[dataIndex], searchValue)} />
    }
    return value || '-';
  }, [searchValue]);

  // 经过 searchValue 过滤后的 dataSource
  const realDataSource = useMemo(() => {
    if (!searchValue) return dataSource;
    return dataSource.filter((data, index) => {
      data._index = index; // 记录一个原来的index 修改BUG
      return columns.some(({ dataIndex, searcher }) => {
        const value = data[dataIndex];
        if (searcher && typeof searcher === 'function') {
          return searcher({
            value,
            completeValue: data,
            index,
            searchValue
          });
        } else if (typeof value === 'string' || typeof value === 'number') {
          return isMatch(value.toString(), searchValue);
        }
        return false;
      })
    })
  }, [searchValue, columns, dataSource]);

  const hasData = realDataSource.length > 0;
  const useVirtual = realDataSource.length >= 50; // 暂定超过50条使用虚拟列表

  // 渲染行
  const renderRow = useCallback((item, index, currentIndex, style = {}) => <div className={`management-table-content-row ${currentIndex % 2 ? 'management-table-content-row_light' : ''}`} style={style} key={item.key || index}>
    {
      columns.map(column => <div className='management-table-content-row-cell' key={column.key || column.dataIndex}>
        {renderCell(column, item, index)}
      </div>)
    }
  </div>, [columns, renderCell]);

  return <div className='management-table' style={{ [useVirtual ? 'height' : 'maxHeight']: `calc(100vh - ${top}px)` }} ref={ref}>
    <div className='management-table-header'>
      {
        columns.map(({ title, dataIndex, key }) => <div className='management-table-header-item' key={key || dataIndex}>
          {
            title
          }
        </div>)
      }
    </div>
    <div className='management-table-content'>
      {
        loading ? <div className='management-table-content-alert'>loading...</div> : !hasData ? <div className='management-table-content-alert'>
          无数据
        </div> : useVirtual ? <VirtualList dataSource={realDataSource} columns={columns} renderRow={renderRow} /> : realDataSource.map((item, index) => renderRow(item, item._index || index, index))
      }
    </div>
    {
      hasData && <div className='management-table-footer'>
        Total: {realDataSource.length}
      </div>
    }
  </div>
}
export {
  isMatch
}
export default Table;