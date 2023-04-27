import { Button, Form, Input, Select, DatePicker } from "antd";
import Phones from "./Phones";
import { States, Years } from "./States";
// import onSubmit from "../../controllers/submitController";
import { useNavigate } from "react-router-dom";
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

const url = "https://reqres.in/api/users"; // API endpoint to be entered here

const DetailsForm = (props) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("success: ", values);
    props.setFormValue(values);
    console.log("User -->", props.user);
    await handleSubmit(values, url);
    if (props.user) {
      navigate("/upload");
    } else {
      navigate("/");
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: "6rem",
        }}
      >
        {Phones.map((individual, index) => {
          const name = individual.code;
          const code = individual.dial_code;
          return (
            <Option value={code} key={index}>
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
            textAlign: "left",
            paddingLeft: "10px",
            backgroundColor: "white",
          }}
        >
          Online Enrollment of Corporate/Bidder
        </p>
        <p
          style={{
            fontFamily: "verdana",
            fontWeight: "bold",
            fontSize: "13px",
            padding: "5px 0px 10px 50px",
            color: "#4f4f4f",
          }}
        >
          <img
            style={{
              height: "15px",
              marginRight: "5px",
            }}
            alt="Title_image"
            src="./bullet1.png"
          ></img>
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
            name="TenderType"
            label="Tender Type"
            rules={[
              {
                required: true,
                message: "Please select tender type",
              },
            ]}
          >
            <Select
              placeholder="Tender type"
              options={[
                {
                  label: "CIVIL",
                  value: "CIVIL",
                },
                {
                  label: "CMC",
                  value: "CMC",
                },
              ]}
            />
          </Form.Item>

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
            label="Name of Partners/Directors"
            labelCol={{ span: "8", offset: "0" }}
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
              {States.map((each, index) => (
                <Option key={index} value={each.name}>
                  {each.name}
                </Option>
              ))}
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
              {Years.map((each, index) => (
                <Option key={index} value={each.year}>
                  {each.year}
                </Option>
              ))}
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
            <Select
              placeholder="Legal Status"
              options={[
                {
                  label: "Limited Company",
                  value: "Limited Company",
                },
                {
                  label: "Undertaking",
                  value: "Undertaking",
                },
                {
                  label: "Jointventure",
                  value: "Jointventurey",
                },
                {
                  label: "Partnership",
                  value: "Partnership",
                },
                {
                  label: "Others",
                  value: "Others",
                },
              ]}
            />
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
            <Select
              placeholder="Company Category"
              options={[
                {
                  label: "Micro Unit as per MSME",
                  value: "Micro Unit as per MSME",
                },
                {
                  label: "Small Unit as per MSME",
                  value: "Small Unit as per MSME",
                },
                {
                  label: "Medium Unit as per MSME",
                  value: "Medium Unit as per MSME",
                },
                {
                  label: "Ancillary Unit",
                  value: "Ancillary Unit",
                },
                {
                  label: "Project Affected Person of this Company",
                  value: "Project Affected Person of this Company",
                },
                {
                  label: "SSI",
                  value: "SSI",
                },
                {
                  label: "Others",
                  value: "Others",
                },
              ]}
            />
          </Form.Item>

          <p
            style={{
              fontFamily: "verdana",
              fontWeight: "bold",
              fontSize: "13px",
              padding: "30px 10px 15px 10px",
              color: "#4f4f4f",
              backgroundColor: "white",
              margin: "10px -10px",
            }}
          >
            <img
            style={{
              height: "15px",
              marginRight: "5px",
              marginLeft: "-5px"
            }}
            alt="Title_image"
            src="./bullet1.png"
          ></img>
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
            <Select
              placeholder="title"
              options={[
                {
                  label: "Mr",
                  value: "Mr",
                },
                {
                  label: "Ms",
                  value: "Ms",
                },
                {
                  label: "Mrs",
                  value: "Mrs",
                },
                {
                  label: "Dr",
                  value: "Dr",
                },
                {
                  label: "Sri",
                  value: "Sri",
                },
              ]}
            />
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
            <Input addonBefore={prefixSelector} maxLength={10} />
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
