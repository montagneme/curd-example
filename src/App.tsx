import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Input from './components/input';
import Button, { TextButton } from './components/button';
import Table, { IDataSource, isMatch } from './components/table';
import AddIcon from './assets/add';
import EditIcon from './assets/edit';
import DeleteIcon from './assets/delete';
import { IColumns } from './components/table';
import HightLight, { transferHighLight } from './components/highlight';
import TagList from './components/tag';
import debounce from 'lodash.debounce';
import SearchIcon from './assets/search';
import SDKForm from './businessComponents/sdkForm';
import { getTableData } from './api';
import './App.scss';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [debounceSearchValue, setDebounceSearchValue] = useState(searchValue);
  const [dataSource, setDataSource] = useState<IDataSource>([]);
  const [loading, setLoading] = useState(true);

  const debounceSearchValueChange = useCallback(debounce((value) => {
    setDebounceSearchValue(value);
  }, 150), []);

  const handleSearchValueChange = useCallback((value) => {
    setSearchValue(value);
    debounceSearchValueChange(value);
  }, []);

  useEffect(() => {
    setLoading(true);
    getTableData().then(res => {
      if (res.Code == 200) {
        setDataSource(res.Data);
      }
    }).finally(() => setLoading(false))
  }, []);

  // 新增
  const handleCreateSubmit = useCallback((formData) => {
    const { tags } = formData;
    const newDataSource = [...dataSource];
    newDataSource.push({
      ...formData,
      sdk: '',
      tags: tags ? tags.split(',') : []
    });
    setDataSource(newDataSource);
  }, [dataSource]);

  const handleEditSubmit = useCallback((index, formData) => {
    const { tags } = formData;
    const newDataSource = [...dataSource];
    console.log('sddd', formData, index);
    newDataSource[index] = {
      ...newDataSource[index],
      ...formData,
      tags: tags ? tags.split(',') : []
    };
    setDataSource(newDataSource);
  }, [dataSource]);

  const handleDelete = useCallback((index) => {
    const newDataSource = [...dataSource];
    newDataSource.splice(index, 1);
    setDataSource(newDataSource);
    console.log('index', index, dataSource, newDataSource);
  }, [dataSource]);

  const tableColumns = useMemo<IColumns>(() => [
    {
      title: 'Client name',
      dataIndex: 'clientName'
    },
    {
      title: 'Board name',
      dataIndex: 'boardName'
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      render: ({ value: tags, searchValue }) => tags.length !== 0 ? <TagList list={tags} tileNum={2} renderTag={tag => <HightLight textList={transferHighLight(tag, searchValue)} />} /> : '-',
      searcher: ({ value: tags, searchValue }) => tags.some(tag => isMatch(tag, searchValue))
    },
    {
      title: 'Requestor',
      dataIndex: 'requestor'
    },
    {
      title: 'SDK script',
      dataIndex: 'sdk',
      render: () => <TextButton>{'</> SDK'}</TextButton>,
      searcher: () => false // 不参与搜索
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: ({
        completeValue,
        index
      }) => <div className='management-view-table-actions'>
          <SDKForm values={{
            ...completeValue,
            tags: completeValue.tags?.toString() || ''
          }} onSubmit={handleEditSubmit.bind(null, index)}>
            <div className='management-view-table-actions-item'>
              <EditIcon />
            </div>
          </SDKForm>
          <div className='management-view-table-actions-item' onClick={handleDelete.bind(null, index)}>
            <DeleteIcon />
          </div>
        </div>,
      searcher: () => false // 不参与搜索
    }
  ], [handleEditSubmit, handleDelete]);

  return (
    <div className='management'>
      <div className='management-menus'>
        <div />
      </div>
      <div className='management-view'>
        <div className='management-view-header'>
          <div className='management-view-header-title'>SDK Management</div>
          <div className='management-view-header-operate'>
            <div className='management-view-header-operate-search'>
              <Input value={searchValue} onChange={handleSearchValueChange} placeholder='Search client name, board name, tags, requestor' prevIcon={<SearchIcon />} />
            </div>
            <div className='management-view-header-operate-button'>
              <SDKForm onSubmit={handleCreateSubmit}>
                <Button prevIcon={<AddIcon />}>Create SDK</Button>
              </SDKForm>
            </div>
          </div>
        </div>
        <div className='management-view-content'>
          <Table columns={tableColumns} dataSource={dataSource} searchValue={debounceSearchValue} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;
