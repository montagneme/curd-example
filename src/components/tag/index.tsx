import React, { useCallback, useMemo } from 'react';
import './index.scss';

interface ITagProps {
  children: React.ReactNode;
}

interface ITagListProps {
  list: React.ReactNode[];
  tileNum?: number;
  renderTag?: (tag) => React.ReactNode;
}

const Tag: React.FC<ITagProps> = ({ children }) => {
  return (
    <div className='management-tag'>
      {children}
    </div>
  );
}

const TagList: React.FC<ITagListProps> = ({ list, tileNum, renderTag }) => {

  const [showList, residueNum] = useMemo(() => {
    if (tileNum === void 0) {
      return [list, 0];
    }
    const showList = [...list];
    const residue = showList.splice(tileNum);
    return [showList, residue.length];
  }, [tileNum, list]);

  return <div className='management-tags'>
    {
      showList.map((text, index) => <div className='management-tags-item'>
        <Tag key={index}>{renderTag && typeof renderTag === 'function' ? renderTag(text) : text}</Tag>
      </div>)
    }
    {
      residueNum !== 0 && <div className='management-tags-item'>
        <Tag>{`+${residueNum}`}</Tag>
      </div>
    }
  </div>
}
export default TagList;