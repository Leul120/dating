import React, { useState } from 'react';
import { Steps, Button, Form, Input, Radio, Select, Slider, Typography, Card, message } from 'antd';
import { useSpring, animated } from 'react-spring';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { SmileOutlined, HeartOutlined, FireOutlined } from '@ant-design/icons';
import axios from 'axios'
const { Step } = Steps;
const { Title } = Typography;
const { Option } = Select;

const steps = [
  {
    title: 'Emotional Rollercoaster',
    content: ({ control, errors }) => (
      <Form layout="vertical">
        <Controller
          name="emotionalIntelligence"
          control={control}
          rules={{ required: 'I need to gauge your drama potential!' }}
          render={({ field }) => (
            <Form.Item label="Emotional Intelligence (aka Drama-o-meter)" validateStatus={errors.emotionalIntelligence ? 'error' : ''} help={errors.emotionalIntelligence?.message}>
              <Slider {...field} marks={{ 1: 'Drama Queen 👑', 5: 'Meh 😐', 10: 'Cucumber Cool 🥒' }} max={10} />
            </Form.Item>
          )}
        />
        <Controller
          name="communicationSkills"
          control={control}
          rules={{ required: 'How else will I know if you can order pizza correctly?' }}
          render={({ field }) => (
            <Form.Item label="Communication Skills" validateStatus={errors.communicationSkills ? 'error' : ''} help={errors.communicationSkills?.message}>
              <Radio.Group {...field}>
                <Radio value="excellent">Excellent - I speak fluent emoji 🤓</Radio>
                <Radio value="average">Average - I can grunt in multiple languages 🦍</Radio>
                <Radio value="poor">Poor - My plants die of loneliness 🌵</Radio>
              </Radio.Group>
            </Form.Item>
          )}
        />
      </Form>
    ),
  },
  {
    title: 'Values & Beliefs',
    content: ({ control, errors }) => (
      <Form layout="vertical">
        <Controller
          name="sharedGoals"
          control={control}
          rules={{ required: 'I need to know if our Netflix queues will align!' }}
          render={({ field }) => (
            <Form.Item label="Life Goals (Choose wisely, no pressure)" validateStatus={errors.sharedGoals ? 'error' : ''} help={errors.sharedGoals?.message}>
              <Select {...field} placeholder="Select your life's mission">
                <Option value="career">Career Driven - Sleeping with my laptop 💻</Option>
                <Option value="family">Family Oriented - I've named my future kids 👶👶👶</Option>
                <Option value="adventure">Adventurous - My middle name is 'Danger' 🏄‍♂️</Option>
                <Option value="chill">Chill & Relax - Professional couch tester 🛋️</Option>
              </Select>
            </Form.Item>
          )}
        />
        <Controller
          name="ethics"
          control={control}
          rules={{ required: 'I need to know if you return shopping carts!' }}
          render={({ field }) => (
            <Form.Item label="Moral Compass" validateStatus={errors.ethics ? 'error' : ''} help={errors.ethics?.message}>
              <Radio.Group {...field}>
                <Radio value="strict">Strict - I alphabetize my spice rack 🧂</Radio>
                <Radio value="flexible">Flexible - Cereal for dinner? Why not! 🥣</Radio>
              </Radio.Group>
            </Form.Item>
          )}
        />
      </Form>
    ),
  },
  {
    title: 'Physical Attraction',
    content: ({ control, errors }) => (
      <Form layout="vertical">
        <Controller
          name="appearance"
          control={control}
          rules={{ required: 'I promise I am not shallow, but...' }}
          render={({ field }) => (
            <Form.Item label="Ideal Look (No pressure, I'm all handsome)" validateStatus={errors.appearance ? 'error' : ''} help={errors.appearance?.message}>
              <Input {...field} placeholder="E.g., 'Must look good in potato sack' 🥔" />
            </Form.Item>
          )}
        />
        <Controller
          name="sexualCompatibility"
          control={control}
          rules={{ required: 'This is crucial for... reasons.' }}
          render={({ field }) => (
            <Form.Item label="Bedroom Harmony" validateStatus={errors.sexualCompatibility ? 'error' : ''} help={errors.sexualCompatibility?.message}>
              <Radio.Group {...field}>
                <Radio value="high">High - I'll make the neighbors jealous 😏</Radio>
                <Radio value="medium">Medium - Netflix AND chill 📺</Radio>
                <Radio value="low">Low - I'm here for the personality 😇</Radio>
              </Radio.Group>
            </Form.Item>
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{ required: 'I promise not to spam... much 📧', pattern: { value: /^\S+@\S+$/i, message: 'Must be a valid email' } }}
          render={({ field }) => (
            <Form.Item validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
              <Input {...field} placeholder="Email (for love letters only)" />
            </Form.Item>
          )}
        />
        <Controller
          name="phone"
          control={control}
          rules={{ required: 'How else will I send you memes?', pattern: { value: /^[0-9]+$/, message: 'Numbers only, please!' } }}
          render={({ field }) => (
            <Form.Item validateStatus={errors.phone ? 'error' : ''} help={errors.phone?.message}>
              <Input {...field} placeholder="Phone (for emergency cat videos)" />
            </Form.Item>
          )}
        />
      </Form>
    ),
  },
];

const DatingForm = () => {
  const [current, setCurrent] = useState(0);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate=useNavigate()
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    reset: true,
    delay: 200,
  });

  const next = () => {
    handleSubmit(() => {
      setCurrent(current + 1);
      message.success("You're one step closer to true love! 💘", 2);
    })();
  };

  const prev = () => setCurrent(current - 1);

  const onSubmit = async (data) => {
    try{
      console.log(data);
      message.success('Form submitted! Cupid is doing a happy dance! 💃🏼, Please check you email Address', 3);
      const response=await axios.post('https://datingkingleul.onrender.com/submit-form',data)
      console.log(response)
      
    }catch(error){
      console.log(error)
    }
    
  };
 

  return (
    <div className='p-32'>
    <Card className="form-card" style={{ maxWidth: 800, margin: 'auto', padding: '2rem', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        <SmileOutlined spin /> Love Laboratory <HeartOutlined spin />
      </Title>
      <Steps current={current} size="small" style={{ marginBottom: '2rem' }}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} icon={index === 2 ? <FireOutlined /> : null} />
        ))}
      </Steps>

      <animated.div style={springProps}>
        {steps[current].content({ control, errors })}
      </animated.div>

      <div className="steps-action" style={{ marginTop: '2rem', textAlign: 'center' }}>
        {current > 0 && (
          <Button style={{ marginRight: 8 }} onClick={prev}>
            ⬅️ Oops, I lied
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next Awkward Question ➡️
          </Button>
        )}
        {current === steps.length - 1 && (
          
            <Button type="primary" onClick={()=>{handleSubmit(onSubmit)
            setTimeout(()=>{
        navigate('/hover')
      },[4000])
      
            }}>
              Find My Soulmate! 🔮
            </Button>
        
        )}
      </div>
    </Card>
    </div>
  );
};

export default DatingForm;

