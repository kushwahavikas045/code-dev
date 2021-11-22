import React from 'react'
import { Result, Button, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;
const Message = ({type, title, subtitle, message, button1, button2}) => {


    console.log(message);
    return (
        <Result
        status={type}
        title={title}
        subTitle={subtitle}
        extra={[
            <Button type="primary" key="console">
              {button1 ? button1 : ''}
            </Button>,
            <Button key="buy">{button2 ? button2 : ''}</Button>,
          ]}
      >
        <div className="desc">
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              The content you submitted has the following details:
            </Text>
          </Paragraph>
          {message.length > 0 && message.map(item => (
              <Paragraph key={item.id}>
              <CheckCircleOutlined className="site-result-demo-error-icon" /> {item.item}
            </Paragraph>
          ))}
        </div>
      </Result>
    )
}

export default Message;
