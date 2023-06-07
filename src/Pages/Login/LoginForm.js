// import { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import customFetch from "../../utils/axios";
// import handleSubmit from "../../controllers/handleSubmit";

// const url = "http://localhost:5000/register";  // Backend endpoint earlier used

// const url = "http://18.214.36.46/login"; // API endpoint to be entered here

const LoginForm = (props) => {
  const navigate = useNavigate();

  // const onFinish = async (values) => {

  const signUp = async (data) => {
    try {
      const result = await customFetch.post("/signup", data);
      const token = result.data.access_token;
      props.setToken(token);
      // const userExist = result.data.isFilled;
      if(token){
        localStorage.setItem("token", token);
        navigate("/Details")
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
        userExist==="0" ? navigate("/Details"): navigate("/success")
      }
      else{
        signUp(data)
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  // const response = await handleSubmit(values, url);
  // const message = response.response.id; // Response ("success message") from backend is to be set here
  // console.log("Response: ",response);
  // props.setUser(message); //user is set from undefined to a value
  // // console.log("message --->", message);
  // // console.log("User --->", props.user);

  //   message ? navigate("/Details") : navigate("/"); // If user is successfully registered then naviagte to next page
  // };

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
            label="Email Id"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your email id!",
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
              Register
            </Button>
            <Button type="primary" htmlType="submit" style={{marginLeft: "15px"}}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
