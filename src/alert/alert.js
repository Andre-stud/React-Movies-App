import { Alert } from 'antd';

function Networkeror({ message, description }) {
  return <Alert className="alert" message={message} description={description} type="error" showIcon />;
}

export default Networkeror;
