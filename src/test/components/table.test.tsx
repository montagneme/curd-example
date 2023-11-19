import { shallow, configure } from 'enzyme';
import VirtualList from '../../components/table/components/virtualList';
import Table from '../../components/table';
import HightLight from '../../components/highlight';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('当超出或等于50条数据时使用虚拟列表', () => {
  const tableData1 = [...Array(50).keys()].map(() => ({}));
  const tableData2 = [...Array(49).keys()].map(() => ({}));
  const component1 = shallow(<Table dataSource={tableData1} columns={[]} />);
  const component2 = shallow(<Table dataSource={tableData2} columns={[]} />);
  expect(component1.find(VirtualList)).toHaveLength(1)
  expect(component2.find(VirtualList)).toHaveLength(0)
});

test('无数据情况显示无数据、loading状态显示loading，并且都不显示总条数', () => {
  const component1 = shallow(<Table dataSource={[]} columns={[]} />);
  const component2 = shallow(<Table dataSource={[]} columns={[]} loading={true} />);
  expect(component1.find('.management-table-content-alert').text()).toBe('无数据')
  expect(component1.find('.management-table-footer')).toHaveLength(0)
  expect(component2.find('.management-table-content-alert').text()).toBe('loading...')
  expect(component2.find('.management-table-footer')).toHaveLength(0)
});

test('支持自定义渲染item、支持自定义筛选器', () => {
  const component = shallow(<Table dataSource={[{
    name: ['David', 'Bob']
  }]} columns={[
    {
      title: 'Name',
      dataIndex: 'name',
      render: ({ value }) => {
        return value.toString();
      },
      searcher: ({ value, searchValue }) => {
        return value.some(v => v.includes(searchValue))
      }
    }
  ]} searchValue='Dav' />);

  expect(component.find('.management-table-content-row-cell').text()).toBe('David,Bob')
});

test('当有搜索值时会进行筛选并且关键字会高亮 - 支持忽略大小写', () => {
  const component = shallow(<Table dataSource={[{
    name: 'David'
  }, {
    name: 'Bob'
  }]} columns={[
    {
      title: 'Name',
      dataIndex: 'name'
    }
  ]} searchValue='dav' />);
  expect(component.find('.management-table-content-row')).toHaveLength(1) // 一行数据
  expect(component.find(HightLight)).toHaveLength(1) // 高亮
});