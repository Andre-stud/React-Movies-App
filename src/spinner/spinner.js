import { Spin } from 'antd';

function Spinner() {
  return <div className="spinner-box">
    <Spin tip="Loading" size="large" />
  </div>;
}

export default Spinner;
