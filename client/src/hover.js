import React, { useState, useRef, useEffect } from 'react';
import { Button, Typography, Layout, Space, Modal, message } from 'antd';
import { HeartOutlined, CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

const ReadyToDatePage = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: '50%', left: '50%' });
  const [clickAttempts, setClickAttempts] = useState(0);
  const containerRef = useRef(null);
  const yesButtonRef = useRef(null);
  useEffect(()=>{
    message.success('Form submitted! Cupid is doing a happy dance! 💃🏼, Please check you email Address', 10);
  },[])
  const getRandomPosition = () => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const yesButtonRect = yesButtonRef.current.getBoundingClientRect();
    
    let newLeft, newTop;
    do {
      newLeft = Math.random() * (containerRect.width - 100);
      newTop = Math.random() * (containerRect.height - 100);
    } while (
      newLeft > yesButtonRect.left - 100 && newLeft < yesButtonRect.right &&
      newTop > yesButtonRect.top - 100 && newTop < yesButtonRect.bottom
    );

    return { left: newLeft, top: newTop };
  };

  const handleNoButtonClick = () => {
    const newPosition = getRandomPosition();
    setNoButtonPosition(newPosition);
    setClickAttempts(prev => prev + 1);
  };

  const handleYesClick = () => {
    Modal.success({
      content: 'Awesome! Prepare for the best date ever! 😎💖',
      okText: "I'm excited!",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setNoButtonPosition(getRandomPosition());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout ref={containerRef} style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <Space direction="vertical" size="large" align="center">
          <Title level={1} style={{ color: '#722ed1' }}>
            Ready to Date Me? <HeartOutlined style={{ color: '#eb2f96' }} />
          </Title>
          <Text type="tertiary" style={{ fontSize: '18px' }}>
            Warning: The "No" button is a bit shy... 😅
          </Text>
          
          <Space size="large">
            <Button 
              ref={yesButtonRef}
              type="primary" 
              size="large" 
              onClick={handleYesClick}
              style={{ 
                backgroundColor: '#722ed1', 
                borderColor: '#722ed1',
                boxShadow: '0 2px 0 rgba(114, 46, 209, 0.1)'
              }}
            >
              Yes, Let's Do This! <HeartOutlined />
            </Button>

            <Button
              danger
              size="large"
              icon={<CloseOutlined />}
              onMouseEnter={handleNoButtonClick}
              style={{
                position: 'absolute',
                left: noButtonPosition.left,
                top: noButtonPosition.top,
                transition: 'all 0.3s ease-out',
              }}
            >
              No
            </Button>
          </Space>

          {clickAttempts > 0 && (
            <Text  italic  type='secondary' style={{ fontSize: '20px' }}>
              {clickAttempts < 5 
                ? `Oops! The button moved. Try again! 😄 (Attempts: ${clickAttempts})` 
                : "Looks like 'No' isn't an option. Why not give 'Yes' a try? 😉"}
            </Text>
          )}
        </Space>
      </Content>
    </Layout>
  );
};

export default ReadyToDatePage;