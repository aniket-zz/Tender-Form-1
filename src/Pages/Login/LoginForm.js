// import { useCallback } from "react";
import { Button, Form, Input } from "antd";
import {  useNavigate, } from "react-router-dom";
import handleSubmit from "../../controllers/handleSubmit";



const url = "https://reqres.in/api/users";


const LoginForm = (props) => {
  const navigate = useNavigate();


  const onFinish = async (values) => {
    // console.log("success: ", values);
    const response = await handleSubmit(values, url)     //user is set from undefined to a value
    console.log('userType_vlaue', response);
    props.setUser(response.response.id);
    console.log('userType_vlaue', props.user);
    await props.user? navigate('/Details'): navigate('/Details')
    // if (props.user) {
    //   navigate('/details')
    // }
    // else {
    //   navigate('/login')
    // }
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };




  return (
    <div>
      <h3>User Registration</h3>
      <div className="login_div">
        <Form
          onSubmit={(e) => handleSubmit(e)}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email Id"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your email id!",
              },
            ]}
          >
            <Input type="email"/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};


export default LoginForm;
