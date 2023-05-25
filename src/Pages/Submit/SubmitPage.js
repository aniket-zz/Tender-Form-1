import React from "react";
import {useEffect, useState} from "react";
// import DetailsForm from "../DetailsForm/DetailsForm";
import customFetch from "../../utils/axios";
import axios from "axios";
import { Button, Form, Alert, message} from "antd";
import handleSubmit from "../../controllers/handleSubmit";
// import details from "./Information.js";
import { useNavigate } from "react-router-dom";


import { Table } from "antd";

const SubmitPage = (props) => {
  const navigate = useNavigate();
  const usrToken = localStorage.getItem("token");

  const [status, setStatus] = useState(1);
  const [info, setInfo] = useState([]);

  const logOut = async () => {
    const resp = await customFetch.post("/logout", {
      headers: {
        authorization: `Bearer ${usrToken}`,
      },
    });
    console.log(resp.data.msg);
    if(resp.data.msg)
    {
      message.success(resp.data.msg)
      navigate("/")
    }
  }

  const getDetails = async () => {
    try {
        const resp = await axios.get(
        "http://18.214.36.46/reports", {
          headers: {
            authorization: `Bearer ${usrToken}`,
          },
        }
      )
      if(resp.data.status === "0")
      {
        const arr = {details: resp.data.details, reports: resp.data.reports};
        const temp = resp.data.status;
        setStatus(temp)
        setInfo(arr)
      }
    } catch (e) {
      console.log(e.message)
    } 
  }   
  useEffect(() => {
    getDetails()   
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const onFinish = async (values) => {
    console.log(values);
    logOut()
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const details = (info);
  console.log(details);

  const columns = [
    {
      title: "Basic Details",
      align: "left",
      children: [
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
      ],
    },
  ];

  const data = [
    {
      key: 1,
      detail: "Tender type",
      value: details?.TenderType,
    },
    {
      key: 2,
      detail: "Company Name / Licence Holder Name",
      value: details?.companyName,
    },
    {
      key: 3,
      detail: "Registration Number",
      value: details?.RegistrationNumber,
    },
    {
      key: 4,
      detail: "Registered Address",
      value: details?.RegisteredAddress,
    },
    {
      key: 5,
      detail: "Name of Partners / Directors",
      value: details?.NameOfPartners,
    },
    {
      key: 6,
      detail: "City",
      value: details?.City,
    },
    {
      key: 7,
      detail: "Postal Code",
      value: details?.PostalCode,
    },
    {
      key: 8,
      detail: "PAN Number",
      value: details?.PANNumber,
    },
    {
      key: 9,
      detail: "Establishment year",
      value: details?.EstablishmentYear,
    },
    {
      key: 10,
      detail: "Nature of Business",
      value: details?.NatureOfBusiness,
    },
    {
      key: 11,
      detail: "Legal Status",
      value: details?.LegalStatus,
    },
    {
      key: 12,
      detail: "Contact Name",
      value: details?.Title + " " + details?.ContactName,
    },
    {
      key: 13,
      detail: "DOB (YYYY-MM-DD)",
      value: details?.DOB.substring(0,10)
        // details?.DOB?.$D +
        // "/ " +
        // details?.DOB?.$M +
        // "/ " +
        // details?.DOB?.$y,
    },
    {
      key: 14,
      detail: "Designation",
      value: details?.Designation,
    },
    {
      key: 15,
      detail: "Phone",
      value: details?.prefix + "  " + details?.phone,
    },
  ];

  //--------------------------------Legal----------------------------------
  // const Legal = details[1]?.legal;

  // const legal_columnn = [
  //   {
  //     title: "Legal",
  //     align: "left",
  //     children: [
  //       {
  //         title: "Name",
  //         dataIndex: "name",
  //         key: "name",
  //         onCell: (_, index) => ({
  //           colSpan: index === 0 ? 2 : 1,
  //         }),
  //       },
  //       {
  //         title: "Value",
  //         dataIndex: "value",
  //         key: "value",
  //         onCell: (_, index) => ({
  //           colSpan: index === 0 ? 0 : 1,
  //         }),
  //       },
  //     ],
  //   },
  // ];

  // const legal_data = [
  //   {
  //     name: "Partnership",
  //     key: "partnership",
  //   },
  //   ...Object.entries(Legal?.partners).map(([key, val], index) => ({
  //     key: index,
  //     name: key,
  //     value: val * 100 + "%",
  //   })),
  //   {
  //     key: "lead",
  //     name: "Lead",
  //     value: Legal?.lead,
  //   },
  // ];

  // const legal_data1 = [
  //   {
  //     key: 10,
  //     name: "Name",
  //     value: Legal?.name
  //   }
  // ]

  // //------------------------------CA---------------------------------
  // const CA = {
  //   udin: details?.udin,
  //   ca_name: details?.ca_name,
  //   companyAudited: details?.company_audited,
  //   workType: details?.type_of_work,
  //   relevantWorkExperience: details?.relevent_work_experience
  // }

  // const ca_columnn = [
  //   {
  //     title: "CA Info",
  //     align: "left",
  //     children: [
  //       {
  //         title: "Name",
  //         dataIndex: "name",
  //         key: "name",
  //         onCell: (_, index) => ({
  //           colSpan: index === 4 ? 2 : 1,
  //         }),
  //       },
  //       {
  //         title: "Value",
  //         dataIndex: "value",
  //         key: "value",
  //         onCell: (_, index) => ({
  //           colSpan: index === 4 ? 0 : 1,
  //         }),
  //       },
  //     ],
  //   },
  // ];

  // const TurnOver = Object.values(CA?.relevantWorkExperience).map((each) =>{
  //   return each["Gross Turn Over"]
  // });
  
  // const ca_data = [
  //   {
  //     key: "ca_name",
  //     name: "CA Name",
  //     value: CA?.ca_name,
  //   },
  //   {
  //     key: "udin",
  //     name: "UDIN",
  //     value: CA?.udin,
  //   },
  //   {
  //     key: "companyAudited",
  //     name: "Company Audited",
  //     value: CA?.companyAudited,
  //   },
  //   {
  //     key: "workType",
  //     name: "Work Type",
  //     value: CA?.workType,
  //   },
  //   {
  //     key: "workExp",
  //     name: "Relevant Work Experience",
  //   },
  //   ...Object.values(CA?.relevantWorkExperience).map((each, index) => ({
  //     key: index,
  //     name: each["Financial Year"],
  //     value: each["Gross Turn Over"],
  //   })),
  // ];

  // //-----------------------Other Part--------------------------

  // const other_column = [
  //   {
  //     title: "Details",
  //     dataIndex: "details",
  //     key: "details",
  //     onCell: (_, index) => ({
  //       colSpan: index === 0 ? 2 : 1,
  //     }),
  //   },
  //   {
  //     title: "Value",
  //     dataIndex: "value",
  //     key: "value",
  //     onCell: (_, index) => ({
  //       colSpan: index === 0 ? 0 : 1,
  //     }),
  //   }
  // ]

  // const other_data = [
  //   {
  //     key: 1,
  //     details: "PAN",
  //   },
  //   ...Object.values(details?.pan).map((each, index) => ({
  //     key: index + 7,
  //     value: each
  //   })),
  //   {
  //     key: 2,
  //     details: "GSTIN",
  //     value: details?.gstin
  //   },
  //   {
  //     key: 3,
  //     details: "Power Of Attorny",
  //     value: details?.attorney
  //   },
  //   {
  //     key: 4,
  //     details: "Digital Signature",
  //     value: details?.dsc
  //   },
  //   {
  //     key: 5,
  //     details: "Workcap (Rs)",
  //     value: details?.workcap
  //   },
  //   {
  //     key: 6,
  //     details: "Similar Work",
  //     value: details?.similar_work ? "YES" : "NO"
  //   }
    
  // ]

  // //-----------------------Calculations Part---------------------

  // //-------COST OF WORK------------
  // const costOfWork = 0.8 * details?.workcap; // 80 % Cost of work in original Notice
  // const sum = TurnOver.reduce((a, b) => a + parseInt(b, 10), 0);
  // const meanTurnover = sum / TurnOver.length || 0;

  // //--------Joint venture------------
  // const numOfBidders = Object.entries(Legal?.partners).length;
  // const leadShare = Math.max(...Object.values(Legal?.partners));
  // const leastShare = Math.min(...Object.values(Legal?.partners));


  // function Check() {
  //   if(meanTurnover < costOfWork){
  //     return (
  //       <Alert
  //           message="Bid Cancelled!"
  //           description="Mean Turnover is less than tha Cost Of Work in Original Notice"
  //           type="error"
  //         />
  //     );
  //   }
  //   if(numOfBidders > 3) {
  //     return (
  //       <Alert
  //           message="Bid Cancelled!"
  //           description="Number of Bidders are more than 3"
  //           type="error"
  //         />
  //     )
  //   }

  //   if(leadShare < 0.5) {
  //     return (
  //       <Alert
  //           message="Bid Cancelled!"
  //           description="Lead Partner Share is less than 50%"
  //           type="error"
  //         />
  //     )
  //   }

  //   if(leastShare < 0.20) {
  //     return (
  //       <Alert
  //           message="Bid Cancelled!"
  //           description="Partnership share of one or more Bidder is less than 20%"
  //           type="error"
  //           showIcon
  //         />
  //     )
  //   }
  // }

  //----------------------Final Return-----------------------

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
      
      {/* {status===0? <div>
          <Table bordered={true} columns={columns||{}} dataSource={data||{}} /> 
          <br />
          <Table
            bordered={true}
            columns={legal_columnn||{}}
            dataSource= {Legal.JV ? legal_data: legal_data1}
          />
          <br />
          <Table bordered={true} columns={ca_columnn} dataSource={ca_data} />
          <br />
          <Table bordered={true} columns={other_column} dataSource={other_data} />
        </div>: message.success("Bid Under Review!")} */}
        <Table bordered={true} columns={columns} dataSource={data? data: {}} /> 


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
          {/* {status===0 ? Check() : <Alert
            message="Bid Under Review!"
            description="Bid is under review!"
            type="info"
          />} */}
          {/* <Button
            style={{ margin: "20px 20px 10px 0px" }}
            type="primary"
            onClick={getDetails}
          >
            Load data
          </Button> */}

          <Button
            style={{ margin: "20px 0px 10px 0px" }}
            type="primary"
            htmlType="submit"
          >
            Logout
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


// const getLegal = async (token) => {
  //   try {
  //     let result = await axios.post(
  //       "http://18.206.81.179/v1/document/legal",
  //       {
  //         userId: "2",
  //         docId: "2",
  //         s3Path:
  //           "s3://deepdelvetesting/mcl/legal/5_Legal_Status_of_the_bidder.pdf",
  //       },
  
  //       {
  //         headers: {
  //           'Access-Control-Allow-Origin': '*',
  //           "Content-Type": "application/json",
  //           'accept': "application/json",
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     return {
  //       LegalInfo: result.data?.LegalInfo,
  //       partnership: result.data?.partnership,
  //     };
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // };

  // const getCA = async (token) => {
  //   try {
  //     let result = await axios.post(
  //       "http://18.206.81.179/v1/document/ca",
  //       {
  //         userId: "1",
  //         docId: "1",
  //         s3Path:
  //           "s3://deepdelvetesting/mcl/ca/CACERTIFICATE1920.pdf",
  //       },
  //       {
  //         headers: {
  //           'Access-Control-Allow-Origin': '*',
  //           "Content-Type": "application/json",
  //           'accept': "application/json",
  //           'Authorization': `Bearer ${token}`
  //         },
  //       }
  //     );
  //     return result.data?.caInfo;

  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // };

  // const getPAN = async (token) => {
  //   try {
  //     let result = await axios.post(
  //       "http://18.206.81.179/v1/document/pan",
  //       {
  //         userId: "4",
  //         docId: "4",
  //         s3Path:
  //           "s3://deepdelvetesting/mcl/pan/3_Permanent_Account_Number.pdf",
  //       },
  //       {
  //         headers: {
  //           'Access-Control-Allow-Origin': '*',
  //           "Content-Type": "application/json",
  //           'accept': "application/json",
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     return result.data?.panNumber;
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // };

  // const getGSTIN = async (token) => {
  //   try {
  //     let result = await axios.post(
  //       "http://18.206.81.179/v1/document/gstin",
  //       {
  //         userId: "4",
  //         docId: "4",
  //         s3Path: "s3://deepdelvetesting/mcl/gistin/4_GST_registration.pdf",
  //       },
  //       {
  //         headers: {
  //           'Access-Control-Allow-Origin': '*',
  //           'Content-Type': "application/json",
  //           'accept': "application/json",
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     return result.data?.gstinNumber;
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // };

  // const getToken = async () => {
  //   try {
  //     let result = await axios.post(
  //       "http://18.206.81.179/token",
  //       { username: "mcl", password: "mclextract" },
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //           accept: "application/json",
  //         },
  //       }
  //     );

  //     if (result.data.access_token) {
  //       const userData = {};
  //       userData.legal = await getLegal(result.data.access_token);
  //       // userData.PAN = await getPAN(result.data.access_token);
  //       // userData.GSTIN = await getGSTIN(result.data.access_token);
  //       userData.CA = await getCA(result.data.access_token);
  //       return userData;
  //     }
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // };

  // useEffect(() => {
  //   const userData = getToken();
  //   console.log(userData);
  // },[]);
