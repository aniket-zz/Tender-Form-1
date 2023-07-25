// import { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import customFetch from "../../utils/axios";
// import handleSubmit from "../../controllers/handleSubmit";

const LoginForm = (props) => {
  const navigate = useNavigate();

  const signUp = async (data) => {
    try {
      const result = await customFetch.post("/signup", data);
      const token = result.data.access_token;
      props.setToken(token);
      if(token){
        localStorage.setItem("token", token);
        navigate("/Bidders")
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  const getToken = async ({ username, password }) => {
    try {
      const data = JSON.stringify({ email: username, password: password });
      const result = await customFetch.post("/login", data);
      const token = result.data.access_token;
      const userExist = result.data.isFilled;
      if(token){
        localStorage.setItem("token", token);
        props.setToken(token);
        userExist==="0" ? navigate("/Bidders"): navigate("/Bidders")    // modification  later
      }
      else{
        signUp(data)
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h3>
        <img
          style={{
            height: "55px",
            position: "relative",
            right: "31%",
            margin: "-5px -5px -10px -5px",
          }}
          alt="logo"
          src="./ism logo.png"
        ></img>
        User Registration
      </h3>
      <div className="login_div">
        <Form
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
          onFinish={getToken}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email Id"      // Modification later
            name="username"
            rules={[
              {
                required: true,
                message: "Please input the email ID!",
              },
            ]}
          >
            <Input type="email" />
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
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            {/* <Button type="primary" htmlType="submit" style={{marginLeft: "15px"}}>
              Login
            </Button> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
