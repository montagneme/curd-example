import React, { useMemo, useState } from 'react';
import SDKManagementView from './businessComponents/sdkManagementView';
import Menus, { IMenuList } from './businessComponents/menus';
import SDKIcon from './assets/sdk';
import './App.scss';

const menus: IMenuList<{ view: React.ReactNode }> = [
  {
    key: 'profile',
    name: 'User Profile',
    view: <div className='container-view-empty'>To be developed</div>
  },
  {
    key: 'sdk',
    name: 'SDK Management',
    view: <SDKManagementView />,
    icon: <SDKIcon />
  },
  {
    key: 'dashboards',
    name: 'Dashboards',
    view: <div className='container-view-empty'>To be developed</div>
  },
  {
    key: 'tc',
    name: 'Terms & Conditions',
    view: <div className='container-view-empty'>To be developed</div>
  }
];

function App() {
  const [activeMenu, setActiveMenu] = useState(menus[1].key); // 默认激活 sdk menu

  const { view } = useMemo(() => {
    return menus.find(menu => menu.key === activeMenu);
  }, [activeMenu]); // 找到对应的视图

  return <div className='container'>
    <div className='container-menus'>
      <Menus menuList={menus} activeMenu={activeMenu} onClick={setActiveMenu} />
    </div>
    <div className='container-view'>
      {
        view
      }
    </div>
  </div>
}

export default App;
