import { Tabs } from 'antd';

function Tabsitem() {
  const arr = ['Search', 'Rated'];
  return <Tabs
    defaultActiveKey="Search"
    centered
    className="tabs"
    items={arr.map((el, i) => {
      const id = String(i + 1);
      return {
        label: el,
        key: id,
        children: '',
      };
    })}
  />;
}
export default Tabsitem;
