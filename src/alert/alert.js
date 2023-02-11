import { Alert, Space } from 'antd';

function Networkrror() {
  return <Space
    direction="vertical"
    style={{
      width: '80%',
      marginLeft: '36px',
      marginTop: '20px',
    }}
  >
    <Alert message="Error" description="Network error." type="error" showIcon />
  </Space>;
}

export default Networkrror;
