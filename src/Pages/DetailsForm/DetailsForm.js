import { Button, Form, Input, Select, DatePicker, } from "antd";
import Phones from "./Phones";
import { States, Years } from "./States"
// import onSubmit from "../../controllers/submitController";
import { useNavigate, } from "react-router-dom";
import handleSubmit from "../../controllers/handleSubmit";


const { Option } = Select;

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select DOB!",
    },
  ],
};

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

// const url = "http://localhost:5000/register";  // Backend endpoint earlier used

const url = "https://reqres.in/api/users";  // API endpoint to be entered here

const DetailsForm = (props) => {
  const navigate = useNavigate();
  
  const [form] = Form.useForm();
  
  const onFinish = async (values) => {
    console.log("success: ", values);
    console.log('User -->', props.user);
    await handleSubmit(values, url);
    if (props.user) {
      navigate('/upload')
    }
    else {
      navigate('/details')
    }
  };


  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: "6rem",
        }}
      >
        {Phones.map((individual) => {
          const name = individual.code;
          const code = individual.dial_code;
          return (
            <Option value={code} key={code}>
              {" "}
              {name} ({code})
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );





  return (
    <div>
      <h3>eTenders Portal (ISM)</h3>
      <div className="details_div">
        <p className="tender_title">Online Enrollment of Corporate/Bidder</p>
        <p
          style={{
            fontFamily: "verdana",
            fontWeight: "bold",
            fontSize: "13px",
            padding: "5px 0px 10px 0px",
            color: "#4f4f4f",
          }}
        >
          Corporate Tenderer Details
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
            name="companyName"
            label="Company Name / Licence Holder Name"
            labelCol={{ span: "7", offset: "1" }}
            rules={[
              {
                required: true,
                message: "Please input your Company Name / Licence Holder Name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="RegistrationNumber"
            label="Registration Number"
            rules={[
              {
                required: true,
                message: "Please input your Registration Number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="RegisteredAddress"
            label="Registered Address"
            rules={[
              {
                required: true,
                message: "Please input Registered Address",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={200} />
          </Form.Item>

          <Form.Item
            name="NameOfPartners"
            label="Name of Partners / Directors"
            labelCol={{ span: "7", offset: "1" }}
            rules={[
              {
                required: true,
                message: "Please input Name of Partners / Directors",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={200} />
          </Form.Item>

          <Form.Item
            name="City"
            label="City"
            rules={[
              {
                required: true,
                message: "Please input your City Name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="State"
            label="State"
            rules={[
              {
                required: true,
                message: "Please select State!",
              },
            ]}
          >
            <Select placeholder="select your state">
              {States.map((each) => {
                return (
                  <option value={each.key} >{each.name}</option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="PostalCode"
            label="Postal Code"
            rules={[
              {
                required: true,
                message: "Please input your Postal Code.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="PANNumber"
            label="PAN Number"
            tooltip="PAN/TAN number must have 10 characters. For eg: AESTG2458A"
            rules={[
              {
                required: true,
                message: "Please input your PAN Number",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="EstablishmentYear"
            label="Establishment year"
            rules={[
              {
                required: true,
                message: "Please select campany's establishment year",
              },
            ]}
          >
            <Select placeholder="Establishment year">
              {Years.map(each => {
                return (
                  <option value={each.key}>{each.year}</option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="NatureOfBusiness"
            label="Nature of Business"
            rules={[
              {
                required: true,
                message: "Please input your Nature of Business",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="LegalStatus"
            label="Legal Status"
            rules={[
              {
                required: true,
                message: "Please select campany's Legal Status",
              },
            ]}
          >
            <Select placeholder="Legal Status">
              <option value="1">Limited Company</option>
              <option value="2">Undertaking</option>
              <option value="3">Jointventure</option>
              <option value="4">Partnership</option>
              <option value="5">Others</option>
            </Select>
          </Form.Item>

          <Form.Item
            name="CompanyCategory"
            label="Company Category"
            rules={[
              {
                required: true,
                message: "Please select Company Category.",
              },
            ]}
          >
            <Select placeholder="Company Category">
              <option value="1">Micro Unit as per MSME</option>
              <option value="2">Small Unit as per MSME</option>
              <option value="3">Medium Unit as per MSME</option>
              <option value="4">Ancillary Unit</option>
              <option value="5">Project Affected Person of this Company</option>
              <option value="6">SSI</option>
              <option value="7">Others</option>
            </Select>
          </Form.Item>

          <p
            style={{
              fontFamily: "verdana",
              fontWeight: "bold",
              fontSize: "13px",
              padding: "20px 0px 10px 0px",
              color: "#4f4f4f",
            }}
          >
            Contact Details{" "}
            <span>(Enter Company's Contact Person Details)</span>
          </p>

          <Form.Item
            name="Title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please select title",
              },
            ]}
          >
            <Select placeholder="title">
              <option value="2">Mr</option>
              <option value="3">Ms</option>
              <option value="1">Mrs</option>
              <option value="4">Dr</option>
              <option value="5">Sri</option>
            </Select>
          </Form.Item>

          <Form.Item
            name="ContactName"
            label="Contact Name"
            rules={[
              {
                required: true,
                message: "Please input Contact Name.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="DOB" label="DOB (YYYY-MM-DD)" {...config}>
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="Designation"
            label="Designation"
            rules={[
              {
                required: true,
                message: "Please input Designation",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            tooltip="Phone Details eg: +91 1234567890"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              maxLength={10}
            />
          </Form.Item>


          <Form.Item {...tailFormItemLayout} style={{ marginTop: "2.5rem" }}>
            <Button type="primary" htmlType="submit" >
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DetailsForm;