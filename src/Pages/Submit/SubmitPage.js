import React, { useEffect, useState } from "react";
import { Button, Form, Alert, message } from "antd";
import handleSubmit from "../../controllers/handleSubmit";
import { useNavigate } from "react-router-dom";
import customFetch from "../../utils/axios";
import { Table } from "antd";

const SubmitPage = (props) => {
  const navigate = useNavigate();
  const usrToken = localStorage.getItem("token");
  /**
   * 0 indicates that bid is processed
   * 1 indicates bid is currenntly processing 
   */
  const [status, setStatus] = useState(1); 
  const [info, setInfo] = useState({});

  const logOut = async () => {
    const resp = await customFetch.post("/logout", {
      headers: {
        authorization: `Bearer ${usrToken}`,
      },
    });
    console.log(resp.data.msg);
    if (resp.data.msg) {
      message.success(resp.data.msg);
      navigate("/");
    }
  };

  const onFinish = async (values) => {
    console.log(values);
    logOut();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(
    () => {
      const getDetails = async () => {
        try {
          const resp = await customFetch.get("/reports", {
            headers: {
              authorization: `Bearer ${usrToken}`,
            },
          });
          console.log(resp);
          if (resp.data.status === "0") {
            const arr = {
              details: resp.data.details,
              reports: resp.data.reports,
            };
            const temp = resp.data.status;
            setStatus(temp);
            setInfo(arr);
          }
        } catch (e) {
          console.log(e.message);
        }
      };
      getDetails();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ ]
  );
  
  const details = info?.details ? JSON.parse(info?.details) : undefined;
  console.log(info);

  const columns = details
    ? [
        {
          title: "BASIC DETAILS",
          align: "center",
          children: [
            {
              title: "DETAIL",
              dataIndex: "detail",
              key: "detail",
              className: "DetailsClass",
              align: "left"
            },
            {
              title: "VALUE",
              dataIndex: "value",
              key: "value",
            },
          ],
        },
      ]
    : {};

  const data = details? [
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
      value: details?.DOB?.substring(0, 10),
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
  ]: {};

  //--------------------------------Report----------------------------------
  const reports = info.reports ? JSON.parse(info.reports) : {};
  console.log(reports);
  

  const Legal = reports.legal ? reports.legal : undefined;
 

  //-------------------------------CIVIL-----------------------------------


  const legal_columnn = [
    {
      title: "LEGAL DATA",
      align: "center",
      children: [
        {
          title: "DETAIL",
          dataIndex: "name",
          key: "name",
          onCell: (_, index) => ({
            // colSpan: index === 2 ? 2 : 1,
            align: index === 2 ? "left" : "left"
          }),
          className: "DetailsClass"
        },
        {
          title: "VALUE",
          dataIndex: "value",
          key: "value",
          onCell: (_, index) => ({
            // colSpan: index === 2 ? 0 : 1,
            className: index === 2 ? "DetailsClass" : "",
          }),
        },
      ],
    },
  ];
  const legal_data = Legal
    ? Legal.JV ? [
        {
          name: "Joint Venture",
          value: "YES",
          key: "jointVenture",
        },
        {
          name: "Joint Venture Name",
          value: Legal.name,
          key:"JVName"
        },
         {
          name: "PARTNER'S NAME",
          value: "SHARE (%)",
          key:"partners"
        },

        ...Object.entries(Legal?.partners).map(([key, val], index) => ({
          key: index,
          name: key,
          value: index === 1 ? val * 100 - 20 + "%" : val * 100 + "%",
        })),
        {
          key: "lead",
          name: "Lead Partner Name",
          value: Legal?.lead,
        },
        {
          name: "Joint Venture Formation date",
          value: Legal['formation date'],
          key: "formationDate"
        } 
      ] : [
        {
          name : "Single Bidder", 
          key:"singleBidder"
        },
      ]
    : {};

  // const legal_data1 = [
  //   {
  //     key: 10,
  //     name: "Name",
  //     value: Legal?.name
  //   }
  // ]

  // //------------------------------CA---------------------------------

  const CA = reports.relevent_work_experience
    ? {
        udin: reports?.udin,
        ca_name: reports?.ca_name,
        companyAudited: reports?.company_audited,
        workType: reports?.type_of_work,
        relevantWorkExperience: reports?.relevent_work_experience,
      }
    : undefined;

  const ca_columnn = [
    {
      title: "CA Info",
      align: "left",
      children: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          onCell: (_, index) => ({
            colSpan: index === 4 ? 2 : 1,
          }),
        },
        {
          title: "Value",
          dataIndex: "value",
          key: "value",
          onCell: (_, index) => ({
            colSpan: index === 4 ? 0 : 1,
          }),
        },
      ],
    },
  ];

  const TurnOver = CA
    ? Object.values(CA?.relevantWorkExperience).map((each) => {
        return each["Gross Turn Over"];
      })
    : [];

  const ca_data = CA
    ? [
        {
          key: "ca_name",
          name: "CA Name",
          value: CA?.ca_name,
        },
        {
          key: "udin",
          name: "UDIN",
          value: CA?.udin,
        },
        {
          key: "companyAudited",
          name: "Company Audited",
          value: CA?.companyAudited,
        },
        {
          key: "workType",
          name: "Work Type",
          value: CA?.workType,
        },
        {
          key: "workExp",
          name: "Relevant Work Experience",
        },
        ...Object.values(CA?.relevantWorkExperience).map((each, index) => ({
          key: index,
          name: each["Financial Year"],
          value: each["Gross Turn Over"],
        })),
      ]
    : undefined;

  //-----------------------NIT Description--------------------
  
  const NIT = reports.nit_desc ? reports.nit_desc : undefined;
  const nit_column = [
    {
      title: "NIT DOCUMENT",
      align: "center",
      children: [
        {
          title: "DETAIL",
          dataIndex: "details",
          key: "details",
          className: "DetailsClass",
        },
        {
          title: "VALUE",
          dataIndex: "value",
          key: "value",
        },
      ]
    }  
  ];


  const nit_data = NIT ? [
    {
      key: 1,
      details: "Work Description",
      value: NIT['Work Description']
    },
    {
      key: 2,
      details: "Bid Start Date",
      value: NIT['Bid Start Date']
    },
    {
      key: 3,
      details: "Bid End Date",
      value: NIT['Bid End Date']
    },
    {
      key: 4,
      details: "Cost of Work",
      value: NIT['Cost of Work']
    },
    {
      key: 5,
      details: "Period of Completion (Days)",
      value: NIT['Period of Completion (Days)'] + " days"
    },
    {
      key: 6,
      details: "Tender Publication Date",
      value: NIT['Tender Publication Data']
    }
  ]: [];

  //-----------------------Other Part--------------------------

  const other_column = [
    {
      title: "DETAIL",
      dataIndex: "details",
      key: "details",
      className: "DetailsClass",
      onCell: (_, index) => ({
        colSpan: index === 6 ? 2 : 1,
        align: index === 6 ? "left": "left",
      }),
    },
    {
      title: "VALUE",
      dataIndex: "value",
      key: "value",
      onCell: (_, index) => ({
        colSpan: index === 6? 0 : 1,
      }),
    },
  ];

  const other_data = reports.pan
    ? [
        {
          key: 2,
          details: "GSTIN Number",
          value: reports?.gstin,
        },
        {
          key: 3,
          details: "Power Of Attorny",
          value: reports?.attorney.attorney,
        },
        {
          key: 4,
          details: "Work Simiarity",
          value: Math.floor(reports.attorney['work similarity'] * 10000)/100 + " %"
        },

        {
          key: 5,
          details: "Digital Signature",
          value: reports?.dsc,
        },
        {
          key: 6,
          details: "Workcap (Cr)",
          value: reports?.workcap['Working Capital'] / 1000000000 + " Cr",
        },
        {
          key: 7,
          details: "Similar Work",
          value: reports?.similar_work ? "YES" : "NO",
        },
        {
          key: 1,
          details: "PAN Details of Partners",
        },
        ...Object.values(reports?.pan).map((each, index) => ({
          key: index + 8,
          details: "Patner " + (index+ 1) ,
          value: each,
        })),
        {
          key: 11,
          details: "UDIN Number",
          value: reports?.workcap['UDIN No']
        },
        {
          key: 12,
          details: "Undertaking",
          value: Math.floor(reports.undertaking * 10000)/100,
        }
      ]
    : {};

  //-----------------------Calculations Part---------------------

  //-------COST OF WORK------------
  const costOfWork = NIT ? 0.5 * NIT['Cost of Work'] : 0; // 50 % Cost of work in original Notice
  // const sum = TurnOver?.reduce((a, b) => a + parseInt(b, 10), 0);
  // const meanTurnover = sum / TurnOver.length || 0;
  const meanTurnover = reports.workcap ? reports?.workcap['Working Capital'] : 0;

  // //--------Joint venture------------
  const numOfBidders = Legal?.partners
    ? Object.entries(Legal?.partners).length
    : 0;
  const leadShare = Legal?.partners
    ? Math.max(...Object.values(Legal?.partners))
    : 0;
  const leastShare = Legal?.partners
    ? Math.min(...Object.values(Legal?.partners)) - 0.20
    : 0;

  function Check() {
    if(costOfWork === 0 || meanTurnover === 0){
      <Alert
          message="Bid Under Review!"
          description="Your Bid is under review, login after sometime."
          type="info"
        />
        return
    }
    if (meanTurnover < costOfWork) {
      return (
        <Alert
          message="Bid Cancelled!"
          description="Mean Turnover is less than tha Cost Of Work in Original Notice"
          type="error"
        />
      );
    }
    if (numOfBidders > 3) {
      return (
        <Alert
          message="Bid Cancelled!"
          description="Number of Bidders are more than 3"
          type="error"
        />
      );
    }

    if (leadShare < 0.5) {
      return (
        <Alert
          message="Bid Cancelled!"
          description="Lead Partner Share is less than 50%"
          type="error"
        />
      );
    }

    if (leastShare < 0.2) {
      return (
        <Alert
          message="Bid Cancelled!"
          description="Partnership share of one or more Bidder is less than 20%"
          type="error"
          showIcon
        />
      );
    }
  }

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
        {status === "0" ? (
          <div>
            <Table pagination={false} bordered={true} columns={columns} dataSource={data} />
            <br />
            <br />
            <Table
              bordered={true}
              pagination={false}
              columns={legal_columnn}
              dataSource={legal_data}
            />
            <br/>
            <br/>
            <Table
              bordered = {true}
              pagination={false}
              columns={nit_column}
              dataSource={nit_data}
            />

            {/* <br />
            <Table bordered={true} columns={ca_columnn} dataSource={ca_data} /> */}
            <br />
            <br />
            <Table
              bordered={true}
              pagination={false}
              columns={other_column}
              dataSource={other_data}
            />
            <br/>
            <br/>
          </div>
        ) : (
          console.log("Bid Under Review!")
        )}

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
          {status==="0" ? Check(): <Alert
            message="Bid Under Review!"
            description="Your bid is under evaluation."
            type="info"
          />}

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
