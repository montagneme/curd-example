import React, { useCallback, useMemo, useRef } from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

const VirtualList = ({ dataSource, columns, renderRow }) => {
  const listRef = useRef(null);

  const cellMeasurerCache = useMemo(() => new CellMeasurerCache({
    defaultHeight: 44,
    fixedWidth: true,
  }), [dataSource]);

  const render = useCallback(({ key, index, style, parent }) => {
    const item = dataSource[index];
    return <CellMeasurer
      key={key}
      cache={cellMeasurerCache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}
    >
      {() => renderRow(item, item._index || index, index, style)}
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