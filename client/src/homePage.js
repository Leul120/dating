import React, { useState, useEffect } from 'react';
import { Button, Typography, Card, Row, Col, Tooltip, Modal } from 'antd';
import { useSpring, animated, config, useTrail } from 'react-spring';
import { Link } from 'react-router-dom';
import { HeartOutlined, RocketOutlined, CrownOutlined, SmileOutlined, ThunderboltOutlined, StarOutlined } from '@ant-design/icons';
import confetti from 'canvas-confetti';

const { Title, Text, Paragraph } = Typography;

const HomePage = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentJoke, setCurrentJoke] = useState('');

  const jokes = [
    "Why did the scarecrow become a successful dating coach? He was outstanding in his field!",
    "I told my date I had a job in construction. I'm building a relationship, of course!",
    "Why did the math book look so sad? Because it had too many problems!",
    "What do you call a fake noodle? An impasta!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJoke(jokes[Math.floor(Math.random() * jokes.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fadeIn = useSpring({ 
    opacity: 1, 
    from: { opacity: 0 }, 
    delay: 200 
  });

  const bounce = useSpring({
    transform: isHovering ? 'scale(1.05)' : 'scale(1)',
    config: config.wobbly
  });

  const rotateCrown = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: { duration: 2000 },
    loop: true,
  });

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

  const rocketLaunch = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      await next({ transform: 'translateY(-50px)' });
      await next({ transform: 'translateY(0px)' });
    },
    config: { tension: 200, friction: 10 },
    loop: true,
  });

  const trail = useTrail(4, {
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
  });

  const rainbowText = useSpring({
    from: { background: 'linear-gradient(0deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff)' },
    to: { background: 'linear-gradient(360deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff)' },
    config: { duration: 3000 },
    loop: true,
  });

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="home-container" style={{ padding: '20px', background: 'linear-gradient(135deg, #FFB6C1, #87CEFA)', minHeight: '100vh', overflow: 'hidden' }}>
      <animated.div style={fadeIn} className="hero-section">
        <Title level={1} className="hero-title">
          <animated.span style={rainbowText} className="bg-clip-text text-transparent">
            Welcome to the Dating Circus! 🎪
          </animated.span>
          <animated.span style={rotateCrown}><CrownOutlined style={{ marginLeft: '10px' }} /></animated.span>
        </Title>
        <Paragraph className="hero-subtitle" style={{ fontSize: '18px', color: '#4B0082' }}>
          Step right up! You're about to meet the greatest catch since sliced bread! <br/><br/> 
          I'm so awesome, my mirror asks for my autograph every morning. 🪞✍️
        </Paragraph>
      </animated.div>

      <Row gutter={[16, 16]} className="requirements-section">
        <Col xs={24} md={12}>
          <animated.div style={bounce} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <Card hoverable className="requirement-card" style={{ background: '#FFD700', borderRadius: '15px' }}>
              <Title level={3}>🎭 The Dating Checklist of Doom!</Title>
              {trail.map((props, index) => (
                <animated.li key={index} style={props} className="requirement-list-item">
                  {["Must laugh at ALL my jokes (even the bad ones)", 
                    "Ability to eat pizza without making a mess (superhuman power)", 
                    "Must be able to talk about our existence and philosophy whenever I want", 
                    "Willingness to debate whether a hotdog is a sandwich"][index]}
                </animated.li>
              ))}
            </Card>
          </animated.div>
        </Col>
        <Col xs={24} md={12}>
          <animated.div style={bounce} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <Card hoverable className="requirement-card" style={{ background: '#98FB98', borderRadius: '15px' }}>
              <Title level={3}>🦄 Unicorn Qualities I Totally Have</Title>
              {trail.map((props, index) => (
                <animated.li key={index} style={props} className="requirement-list-item">
                  {["Can make vegetables taste like candy (magic powers)", 
                    "Ability to find lost items in under 10 seconds", 
                    "Dance moves that would make even your grandma jealous", 
                    "Mind-reading skills (but only for pizza toppings)"][index]}
                </animated.li>
              ))}
            </Card>
          </animated.div>
        </Col>
      </Row>

      <animated.div style={fadeIn} className="traits-section">
        <Title level={2} className="traits-title" style={{ color: '#8A2BE2' }}>
          Why I'm Basically a Superhero 🦸‍♂️
        </Title>
        <Row gutter={[16, 16]}>
          {[
            { icon: <SmileOutlined />, text: "I make onions cry" },
            { icon: <HeartOutlined />, text: "My love is stronger than my WiFi signal" },
            { icon: <RocketOutlined />, text: "I put the 'pro' in procrastination" },
            { icon: <CrownOutlined />, text: "I'm fluent in sarcasm and emoji" },
            { icon: <ThunderboltOutlined />, text: "I can parallel park on the first try" },
            { icon: <StarOutlined />, text: "I've never lost a staring contest with a cat" }
          ].map((trait, index) => (
            <Col xs={12} md={4} key={index}>
              <Tooltip title={trait.text}>
                <animated.div style={index % 2 === 0 ? flyingHeart : rocketLaunch}>
                  {React.cloneElement(trait.icon, { style: { fontSize: '24px', color: '#FF1493' } })}
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
            onClick={() => {
              launchConfetti();
              setShowModal(true);
            }}
          >
            Embark on this Ridiculous Journey! 🚀
          </Button>
        </Link>
      </animated.div>

      <animated.div style={fadeIn} className="joke-section">
        <Card style={{ marginTop: '20px', background: 'rgba(255, 255, 255, 0.8)' }}>
          <Title level={4}>Dad Joke of the Moment:</Title>
          <Text>{currentJoke}</Text>
        </Card>
      </animated.div>

      <Modal
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        title="Congratulations! 🎉"
      >
        <p>You've won a lifetime supply of cheesy jokes and dad puns!</p>
        <p>Bonus: A virtual high-five! ✋</p>
      </Modal>
    </div>
  );
};

export default HomePage;