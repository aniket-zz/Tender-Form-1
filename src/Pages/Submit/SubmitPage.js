import React from "react";
// import { useCallback } from "react";
// import DetailsForm from "../DetailsForm/DetailsForm";
import { Button, Form } from "antd";
import handleSubmit from "../../controllers/handleSubmit";

import { Table } from "antd";
const SubmitPage = (props) => {
  const onFinish = async (values) => {
    console.log("Values", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "value",
      dataIndex: "value",
      key: "value",
    },
  ];

  const data = [
     {
      detail : 'Tender type',
      value : props.formValue.TenderType
     },
     {
      detail : 'Company Name / Licence Holder Name',
      value : props.formValue.companyName
     },
     {
      detail : 'Registration Number',
      value : props.formValue.RegistrationNumber
     },
     {
      detail : 'Registered Address',
      value : props.formValue.RegisteredAddress
     },
     {
      detail : 'Name of Partners / Directors',
      value : props.formValue.NameOfPartners
     },
     {
      detail : 'City',
      value : props.formValue.City
     },
     {
      detail : 'Postal Code',
      value : props.formValue.PostalCode
     },
     {
      detail : 'PAN Number',
      value : props.formValue.PANNumber
     },
     {
      detail : 'Establishment year',
      value : props.formValue.EstablishmentYear
     },
     {
      detail : 'Nature of Business',
      value : props.formValue.NatureOfBusiness
     },
     {
      detail : 'Legal Status',
      value : props.formValue.LegalStatus
     },
     {
      detail : 'Contact Name',
      value : props.formValue.Title + " " + props.formValue.ContactName
     },
     {
      detail : 'DOB (YYYY-MM-DD)',
      value : props.formValue.DOB.$D + "/ " +  props.formValue.DOB.$M + "/ " + props.formValue.DOB.$y
     },
     {
      detail : 'Designation',
      value : props.formValue.Designation
     },
     {
      detail : 'Phone',
      value : props.formValue.prefix + "  " + props.formValue.phone
     }
  ];

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
      <p className="submit_title" style={{ padding: "10px" }}>
        Bidder Details
      </p>
      <div className="submit_div">
        <Table columns={columns} dataSource={data} />
        <Form
          onSubmit={(e) => handleSubmit(e)}
          name="basic"
          style={{
            left: "0rem",
          }}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Button
            style={{ margin: "20px 0px 10px 0px" }}
            type="primary"
            htmlType="submit"
            href="/"
          >
            Go to Home Page
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SubmitPage;

// const SubmitPage = (props) => {
//     const onFinish = async (values) => {
//         console.log('Values', values);

//       };
//     const onFinishFailed = (errorInfo) => {
//         console.log("Failed:", errorInfo);
//       };

//   return (
//     <div>
//       <h3>Registered successfully!</h3>
//       <p className="details_div">{
//         (props.formValue).map(each => {
//                 return (

//                 )
//               })}
//       </p>
//       <div className="login_div">
//         <Form
//           onSubmit={(e) => handleSubmit(e)}
//           name="basic"
//           labelCol={{
//             span: 8,
//           }}
//           wrapperCol={{
//             span: 16,
//           }}
//           style={{
//             maxWidth: 600,
//           }}
//           initialValues={{
//             remember: true,
//           }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           autoComplete="off"
//         >

//             <Button type="primary" htmlType="submit" href="/" >
//               Go to Home Page
//             </Button>

//         </Form>
//       </div>
//     </div>
//   );
// };

// export default SubmitPage;
