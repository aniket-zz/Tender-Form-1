import React from "react";
// import { useCallback } from "react";
// import DetailsForm from "../DetailsForm/DetailsForm";
import { Button, Form } from "antd";
import handleSubmit from "../../controllers/handleSubmit";



// const url = "http://localhost:5000/";

const SubmitPage = (props) => {
    const onFinish = async (values) => {
        console.log('Values', values);
        
      };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };

  return (
    <div>
      <h3>Registered successfully!</h3>
      <p className="details_div">User Entered details and the details extracted from the user's documents will be shown here after complete implementation of the NLP.</p>
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
          
            <Button type="primary" htmlType="submit" href="/" >
              Go to Home Page
            </Button>
          
        </Form>
      </div>
    </div>
  );
};


export default SubmitPage;
