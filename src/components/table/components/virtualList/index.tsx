import React, { useCallback, useMemo, useRef } from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

const VirtualList = ({ dataSource, columns, renderRow }) => {
  const listRef = useRef(null);

  const cellMeasurerCache = useMemo(() => new CellMeasurerCache({
    defaultHeight: 44, // 默认行高度
    fixedWidth: true, // 是否有固定的宽度
  }), [dataSource]);

  const render = useCallback(({ key, index, style, parent }) => {
    const item = dataSource[index];
    return <CellMeasurer
      key={key}
      cache={cellMeasurerCache}
      parent={parent}
      columnIndex={0} // 对于单列列表，列索引为 0
      rowIndex={index}
    >
      {() => renderRow(item, index, style)}
    </CellMeasurer>
  }, [dataSource, renderRow]);

  return <AutoSizer>
    {
      ({
        width,
        height
      }) => <List
          ref={listRef}
          width={width}
          height={height}
          rowCount={dataSource.length}
          rowHeight={cellMeasurerCache.rowHeight}
          rowRenderer={render}
        />
    }
  </AutoSizer>

}

export default VirtualList;