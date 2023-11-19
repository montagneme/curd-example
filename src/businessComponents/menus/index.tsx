import React from 'react';
import './index.scss';

export type IMenuList<IExtra = {}> = ({
  key: string;
  name: string;
  icon?: React.ReactElement;
  [otherKey: string]: any;
} & IExtra)[]

interface IProps {
  menuList: IMenuList;
  activeMenu?: string;
  onClick?: (key: string) => void;
}

const Menus: React.FC<IProps> = ({ menuList = [], activeMenu, onClick }) => {
  return <div className='menus'>
    {
      menuList.map(({ icon, name, key }) => <div className={`menus-item ${activeMenu == key ? 'menus-item_active' : ''}`} key={key} onClick={onClick?.bind(null, key)}>
        {
          icon && <div className='menus-item-icon'>{icon}</div>
        }
        <div className='menus-item-name'>{name}</div>
      </div>)
    }
  </div>
}
export default Menus;