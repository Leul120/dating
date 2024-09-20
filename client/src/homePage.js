import React, { useState } from 'react';
import { Button, Typography, Card, Row, Col, Tooltip } from 'antd';
import { useSpring, animated, config } from 'react-spring';
import { Link } from 'react-router-dom';
import { HeartOutlined, RocketOutlined, CrownOutlined, SmileOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const HomePage = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Animation for the intro text
  const fadeIn = useSpring({ 
    opacity: 1, 
    from: { opacity: 0 }, 
    delay: 200 
  });

  // Bouncing animation for cards
  const bounce = useSpring({
    transform: isHovering ? 'scale(1.05)' : 'scale(1)',
    config: config.wobbly
  });

  // Rotating animation for the crown icon
  const rotateCrown = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: { duration: 2000 },
    loop: true,
  });

  // Flying heart animation
  const flyingHeart = useSpring({
    from: { transform: 'translateY(0px) translateX(0px)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(-20px) translateX(20px)' });
        await next({ transform: 'translateY(0px) translateX(0px)' });
      }
    },
    config: { duration: 1000 },
  });

  // Rocket launch animation
  const rocketLaunch = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      await next({ transform: 'translateY(-50px)' });
      await next({ transform: 'translateY(0px)' });
    },
    config: { tension: 200, friction: 10 },
    loop: true,
  });

  return (
    <div className="home-container" style={{ padding: '20px', background: 'linear-gradient(135deg, #FFB6C1, #87CEFA)' }}>
      {/* Animated Intro Section */}
      <animated.div style={fadeIn} className="hero-section">
        <Title level={1} className="hero-title" style={{ color: '#FF1493' }}>
          Welcome to the Dating Circus! 🎪
          <animated.span style={rotateCrown}><CrownOutlined style={{ marginLeft: '10px' }} /></animated.span>
        </Title>
        <Text className="hero-subtitle" style={{ fontSize: '18px', color: '#4B0082' }}>
          Step right up! You're about to meet the greatest catch since sliced bread! <br/><br/> 
          I'm so awesome, my mirror asks for my autograph every morning. 🪞✍️
        </Text>
      </animated.div>

      {/* Requirements and Eligibility Section */}
      <Row gutter={[16, 16]} className="requirements-section">
        <Col xs={24} md={12}>
          <animated.div style={bounce} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <Card hoverable className="requirement-card" style={{ background: '#FFD700', borderRadius: '15px' }}>
              <Title level={3}>🎭 The Dating Checklist of Doom!</Title>
              <ul className="requirement-list" style={{ listStyleType: 'none', padding: 0 }}>
                <li>✅ Must laugh at ALL my jokes (even the bad ones)</li>
                <li>✅ Ability to eat pizza without making a mess (superhuman power)</li>
                <li>✅ Must be able to talk about our existence and philosophy whenever i want</li>
                <li>✅ Willingness to debate whether an Erteb is a sandwich or a Burger</li>
              </ul>
            </Card>
          </animated.div>
        </Col>
        <Col xs={24} md={12}>
          <animated.div style={bounce} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <Card hoverable className="requirement-card" style={{ background: '#98FB98', borderRadius: '15px' }}>
              <Title level={3}>🦄 Unicorn Qualities I Totally Have</Title>
              <ul className="requirement-list" style={{ listStyleType: 'none', padding: 0 }}>
                <li>🧙‍♂️ Can make vegetables taste like candy (magic powers)</li>
                <li>🦸‍♂️ Ability to find lost items in under 10 seconds</li>
                <li>🕺 Dance moves that would make even your grandma jealous</li>
                <li>🧠 Mind-reading skills</li>
              </ul>
            </Card>
          </animated.div>
        </Col>
      </Row>

      {/* Best Human Traits Section */}
      <animated.div style={fadeIn} className="traits-section">
        <Title level={2} className="traits-title" style={{ color: '#8A2BE2' }}>
          Why I'm Basically a Superhero 🦸‍♂️
        </Title>
        <Row gutter={[16, 16]}>
          {[
            { icon: <SmileOutlined />, text: "I make onions cry" },
            { icon: <HeartOutlined />, text: "My love is stronger than my WiFi signal" },
            { icon: <RocketOutlined />, text: "I put the 'pro' in procrastination" },
            { icon: <CrownOutlined />, text: "I'm fluent in sarcasm and emoji" }
          ].map((trait, index) => (
            <Col xs={12} md={6} key={index}>
              <Tooltip title={trait.text}>
                <animated.div style={index % 2 === 0 ? flyingHeart : rocketLaunch}>
                  {trait.icon}
                </animated.div>
              </Tooltip>
            </Col>
          ))}
        </Row>
        <Link to='/form'>
          <Button 
            type="primary" 
            size="large" 
            className="cta-button w-full text-wrap" 
            style={{ marginTop: '20px', background: '#FF69B4', borderColor: '#FF1493' }}
            onClick={() => alert("Congratulations! You've won a lifetime supply of cheesy jokes and dad puns! 🎉🧀")}
          >
            Embark on this Ridiculous Journey! 🚀
          </Button>
        </Link>
      </animated.div>
    </div>
  );
};

export default HomePage;