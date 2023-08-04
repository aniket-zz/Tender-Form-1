import { Button, Form, Input, Select, message } from "antd";
// import Phones from "./Phones";
// import { States, Years } from "./States";
import { useNavigate } from "react-router-dom";
import customFetch from "../../utils/axios";

// const { Option } = Select;

// const config = {
//   rules: [
//     {
//       type: "object",
//       required: false,
//       message: "Please select DOB!",
//     },
//   ],
// };

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


const DetailsForm = (props) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      console.log("success: ", values);
      props.setFormValue(values);
      const usrToken = localStorage.getItem("token");
      const resp = await customFetch.post("/details", {details: JSON.stringify(values)}, {
        headers: {
          authorization: `Bearer ${usrToken}`,
        },
      });
      console.log(resp);
      message.success(resp?.data?.msg);
      const ID = resp.data.bid_id;
      props.setID(ID);
      navigate('/upload')
    } catch (e) {
      console.log(e);
      message.error(e.data);
    }
  };

  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select
  //       style={{
  //         width: "6rem",
  //       }}
  //     >
  //       {Phones.map((individual, index) => {
  //         const name = individual.code;
  //         const code = individual.dial_code;
  //         return (
  //           <Option value={code} key={index}>
  //             {" "}
  //             {name} ({code})
  //           </Option>
  //         );
  //       })}
  //     </Select>
  //   </Form.Item>
  // );

  return (
    <div>
      <h3>
        <img
          style={{
            height: "55px",
            position: "relative",
            right: "27%",
            margin: "-5px -5px -10px -5px",
          }}
          alt="logo"
          src="./ism logo.png"
        ></img>
        eTenders Portal (ISM)
      </h3>
      <div className="details_div">
        <p
          className="tender_title"
          style={{
            paddingLeft: "40px",
            backgroundColor: "white",
          }}
        >
          Enrollment of a new Bidder
        </p>
        <p
          style={{
            fontFamily: "verdana",
            fontWeight: "bold",
            fontSize: "13px",
            padding: "5px 0px 10px 40px",
            color: "#4f4f4f",
          }}
        >
          Enter Bidder's basic details
        </p>

        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          labelWrap
          initialValues={{
            prefix: "-Select-",
          }}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="TenderType"
            label="Tender Type"
            rules={[
              {
                required: false,
                message: "Please select tender type",
              },
            ]}
          >
            <Select
              placeholder="Tender type"
              options={[
                {
                  label: "CIVIL",
                  value: "civil",
                },
                {
                  label: "CMC",
                  value: "cmc",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="BidderRefNo"
            label="Bidder reference Number"
            rules={[
              {
                required: false,
                message: "Please enter the Bidder reference number!",
              },
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            name="companyName"
            label="License Holder/ Company Name"
            labelCol={{ span: "7", offset: "1" }}
            rules={[
              {
                required: false,
                message: "Please input Licence Holder/ Bidder's Name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout} style={{ marginTop: "2.5rem" }}>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DetailsForm;
