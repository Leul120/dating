import React, { useState, useEffect } from 'react';
import { Button, Typography, Card, Row, Col, Tooltip, Modal, Spin } from '@/components/ui/card';
import { useSpring, animated, config, useTrail } from 'react-spring';
import { Link } from 'react-router-dom';
import { Heart, Rocket, Crown, Smile, Zap, Star, Coffee, Pizza, Headphones, Cat } from 'lucide-react';
import confetti from 'canvas-confetti';

const { Title, Text } = Typography;

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

  const handleCtaClick = () => {
    setIsLoading(true);
    launchConfetti();
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 2000);
  };

  return (
    <div className="p-4 bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen overflow-hidden">
      <animated.div style={fadeIn} className="text-center mb-8">
        <Title className="text-4xl font-bold">
          <animated.span style={rainbowText} className="bg-clip-text text-transparent">
            Welcome to the Dating Circus! 🎪
          </animated.span>
          <animated.span style={spinningHeart}><Heart className="inline-block ml-2 text-red-500" /></animated.span>
        </Title>
        <Text className="text-xl text-purple-800">
          Where love is a laughing matter and your soulmate might just be a clown! 🤡💘
        </Text>
      </animated.div>

      <Row className="mb-8">
        <Col xs={24} md={12} className="p-2">
          <animated.div style={bounce} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <Card className="bg-yellow-300 rounded-xl shadow-lg">
              <Title level={3} className="text-center mb-4">🎭 The "You Must Be This Crazy to Ride" List</Title>
              {trail.map((props, index) => (
                <animated.li key={index} style={props} className="mb-2 text-lg">
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
        <Col xs={24} md={12} className="p-2">
          <animated.div style={bounce} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <Card className="bg-green-200 rounded-xl shadow-lg">
              <Title level={3} className="text-center mb-4">🦄 My Totally Real and Not at All Exaggerated Qualities</Title>
              {trail.map((props, index) => (
                <animated.li key={index} style={props} className="mb-2 text-lg">
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

      <animated.div style={fadeIn} className="text-center mb-8">
        <Title level={2} className="text-2xl font-bold text-purple-700 mb-4">
          Why I'm Basically a Superhero (in My Own Mind) 🦸‍♂️
        </Title>
        <Row className="justify-center">
          {[
            { icon: <Coffee size={24} />, text: "I turn coffee into code and chaos" },
            { icon: <Pizza size={24} />, text: "I can eat a whole pizza without regret" },
            { icon: <Headphones size={24} />, text: "My playlists have their own fan clubs" },
            { icon: <Cat size={24} />, text: "I speak fluent cat (meow means meow, right?)" },
            { icon: <Zap size={24} />, text: "I can parallel park... in video games" },
            { icon: <Star size={24} />, text: "I've never lost a staring contest with my reflection" }
          ].map((trait, index) => (
            <Col xs={12} md={4} key={index} className="mb-4">
              <Tooltip title={trait.text}>
                <animated.div style={index % 2 === 0 ? spinningHeart : rocketLaunch} className="text-pink-500">
                  {trait.icon}
                </animated.div>
              </Tooltip>
            </Col>
          ))}
        </Row>
        <Button 
          onClick={handleCtaClick}
          className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full text-lg"
        >
          {isLoading ? <Spin /> : "Dive into the Love Lagoon! 🏊‍♂️💘"}
        </Button>
      </animated.div>

      <animated.div style={fadeIn} className="text-center">
        <Card className="bg-white bg-opacity-80 rounded-xl shadow-lg">
          <Title level={4} className="mb-2">Dad Joke of the Moment (Groan Warning):</Title>
          <Text className="text-lg italic">"{currentJoke}"</Text>
        </Card>
      </animated.div>

      <Modal
        open={showModal}
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