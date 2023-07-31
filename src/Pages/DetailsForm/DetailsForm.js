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

          {/* <Form.Item
            name="RegistrationNumber"
            label="Registration Number"
            rules={[
              {
                required: false,
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
                required: false,
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
                required: false,
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
                required: false,
                message: "Please input City Name",
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
                required: false,
                message: "Please select State!",
              },
            ]}
          >
            <Select placeholder="select the state">
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
                required: false,
                message: "Please input the Postal Code.",
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
                required: false,
                message: "Please input the PAN Number",
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
                required: false,
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
                required: false,
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
                required: false,
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
                required: false,
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
              padding: "30px 10px 15px 0px",
              color: "#4f4f4f",
              backgroundColor: "white",
              margin: "20px -20px",
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
                required: false,
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
                required: false,
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
                required: false,
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
                required: false,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input addonBefore={prefixSelector} maxLength={10} />
          </Form.Item> */}

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
