import React, { useState, useEffect } from 'react';
import { Button, Typography, Card, Row, Col, Tooltip, Modal, Spin } from 'antd';
import { FaHeart, FaRocket, FaCrown, FaSmile, FaBolt, FaStar, FaCoffee, FaPizzaSlice, FaHeadphones, FaCat } from 'react-icons/fa';
import { useSpring, animated, config, useTrail } from 'react-spring';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

const { Title, Text, Paragraph } = Typography;

const HomePage = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentJoke, setCurrentJoke] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const jokes = [
    "I told my date I had a job in construction. I'm building a relationship, of course!",
    "Why did the scarecrow become a successful dating coach? He was outstanding in his field!",
    "I asked my crush out with a bunch of frozen vegetables. But she gave me the cold shoulder.",
    "My love life is like a Ferrari. I don't have a Ferrari.",
    "I'm not saying I'm Wonder Woman, I'm just saying no one has ever seen me and Wonder Woman in the same room together.",
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

  const spinningHeart = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: { duration: 2000 },
    loop: true,
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
    from: { background: 'linear-gradient(0deg, #668c70, #84a16a, #6d6696, #00ff00, #78404f, #8b00ff)' },
    to: { background: 'linear-gradient(360deg, #784040, #7a7242, #ffff00, #00ff00, #547a42, #8b00ff)' },
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

  const handleCtaClick = () => {
    setIsLoading(true);
    launchConfetti();
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 2000);
  };

  return (
    <div style={{ padding: '20px', background: 'linear-gradient(135deg, #FFB6C1, #87CEFA)', minHeight: '100vh' }}>
      <animated.div style={fadeIn}>
        <Title level={1} style={{ textAlign: 'center', marginBottom: '20px' }}>
          <animated.span style={rainbowText} className="bg-clip-text text-transparent p-2 rounded-lg">
            Welcome to the Dating Circus! 🎪
          </animated.span>
          <animated.span style={spinningHeart}><FaHeart style={{ marginLeft: '10px', color: '#FF69B4' }} /></animated.span>
        </Title>
        <Paragraph style={{ fontSize: '18px', color: '#4B0082', textAlign: 'center' }}>
          Where love is a laughing matter and your soulmate might just be a clown! 🤡💘
        </Paragraph>
      </animated.div>

      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} md={12}>
          <animated.div style={bounce} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <Card hoverable style={{ background: '#FFD700', borderRadius: '15px' }}>
              <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>🎭 The "You Must Be This Crazy to Ride" List</Title>
              {trail.map((props, index) => (
                <animated.li key={index} style={{ ...props, marginBottom: '10px', fontSize: '16px' }}>
                  {[
                    "Must laugh at my jokes (even when they're so bad, they're good)",
                    "Ability to turn Netflix browsing into an Olympic sport",
                    "Willingness to debate whether cereal is a soup (it totally is)",
                    "Expert-level skills in building pillow forts for grown-ups"
                  ][index]}
                </animated.li>
              ))}
            </Card>
          </animated.div>
        </Col>
        <Col xs={24} md={12}>
          <animated.div style={bounce} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <Card hoverable style={{ background: '#98FB98', borderRadius: '15px' }}>
              <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>🦄 My Totally Real and Not at All Exaggerated Qualities</Title>
              {trail.map((props, index) => (
                <animated.li key={index} style={{ ...props, marginBottom: '10px', fontSize: '16px' }}>
                  {[
                    "Can turn water into wine (or at least convincingly fake it)",
                    "Ability to read minds (but only for pizza toppings)",
                    "Dance moves that would make even your grandma jealous",
                    "Can fold a fitted sheet perfectly (okay, this one's a lie)"
                  ][index]}
                </animated.li>
              ))}
            </Card>
          </animated.div>
        </Col>
      </Row>

      <animated.div style={fadeIn}>
        <Title level={2} style={{ textAlign: 'center', color: '#8A2BE2', marginBottom: '20px' }}>
          Why I'm Basically a Superhero (in My Own Mind) 🦸‍♂️
        </Title>
        <Row gutter={[16, 16]} justify="center" style={{ marginBottom: '20px' }}>
          {[
            { icon: <FaCoffee />, text: "I turn coffee into code and chaos" },
            { icon: <FaPizzaSlice />, text: "I can eat a whole pizza without regret" },
            { icon: <FaHeadphones />, text: "My playlists have their own fan clubs" },
            { icon: <FaCat />, text: "I speak fluent cat (meow means meow, right?)" },
            { icon: <FaBolt />, text: "I can parallel park... in video games" },
            { icon: <FaStar />, text: "I've never lost a staring contest with my reflection" }
          ].map((trait, index) => (
            <Col xs={12} md={4} key={index}>
              <Tooltip title={trait.text}>
                <animated.div style={index % 2 === 0 ? spinningHeart : rocketLaunch}>
                  {React.cloneElement(trait.icon, { style: { fontSize: '24px', color: '#FF1493' } })}
                </animated.div>
              </Tooltip>
            </Col>
          ))}
        </Row>
        <div style={{ textAlign: 'center' }}>
          <Button 
            type="primary" 
            size="large"
            onClick={handleCtaClick}
            style={{ background: '#FF69B4', borderColor: '#FF1493' }}
          >
            {isLoading ? <Spin /> : "Dive into the Love Lagoon! 🏊‍♂️💘"}
          </Button>
        </div>
      </animated.div>

      <animated.div style={fadeIn}>
        <Card style={{ marginTop: '20px', background: 'rgba(255, 255, 255, 0.8)' }}>
          <Title level={4}>Dad Joke of the Moment (Groan Warning):</Title>
          <Text italic>{currentJoke}</Text>
        </Card>
      </animated.div>

      <Modal
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        title="🎉 Congratulations, Brave Soul! 🎉"
      >
        <p>You've won a lifetime supply of cheesy pickup lines and awkward first date stories!</p>
        <p>Bonus: A virtual high-five and a participation trophy for your courage! 🏆✋</p>
      </Modal>
    </div>
  );
};

export default HomePage;