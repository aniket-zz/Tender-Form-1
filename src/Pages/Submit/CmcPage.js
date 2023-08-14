import React, { useEffect, useState } from "react";
import { Button, Form, Alert, message } from "antd";
import handleSubmit from "../../controllers/handleSubmit";
import { useNavigate } from "react-router-dom";
import customFetch from "../../utils/axios";
import { Table, ConfigProvider } from "antd";
import CMCdata from "./Information";

const CMCPage = (props) => {
  const navigate = useNavigate();
  const usrToken = localStorage.getItem("token");
/*
   * Status value:
   * 0 indicates that document is processed
   * 1 indicates document is currenntly processing
*/
  const [status, setStatus] = useState(1);  // Holds the value of status
  const [info, setInfo] = useState({});     // Holds "Details" and "Reports"

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

  console.log(props.id);
  const index = props.id;     // Holds the Index of the clicked bidder from the bidder list

  useEffect(
    () => {
      const getDetails = async () => {
        try {
          const resp = await customFetch.get("/bidder_list", {
            headers: {
              authorization: `Bearer ${usrToken}`,
            },
          });
          console.log(resp);
          const list = resp.data.bidder_list[index];
          // console.log(list);

          if (list.status === "0") {
            const arr = {
              details: list.details,
              reports: list.output,
            };
            const temp = list.status;
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
    []
  );

  const details = info.details ? JSON.parse(info.details) : undefined;
  console.log(info);

  const columns = [
        {
          title: "BASIC DETAILS",
          align: "center",
          key: "basicdetails",
          className: "tableHeading",
          children: [
            {
              title: "DETAIL",
              dataIndex: "detail",
              key: "detail",
              className: "DetailsClass",
              align: "left",
            },
            {
              title: "VALUE",
              dataIndex: "value",
              key: "value",
              className: "tableValues",
            },
          ],
        },
      ];

  const data = details
    ? [
        {
          key: 1,
          detail: "Tender type",
          value: details?.TenderType,
        },
        {
          key: "refNo",
          detail: "Bidder Reference Number",
          value: details?.BidderRefNo,
        },
        {
          key: 2,
          detail: "Company/Licence Holder Name",
          value: details?.companyName,
        }
      ]
    : [];

  //--------------------------------Report----------------------------------
  const reports = info.reports ? JSON.parse(info.reports) : {};
  console.log(reports);

  const Legal = reports.legal ? reports.legal : undefined;

  //-------------------------------CIVIL-----------------------------------

  const legal_columnn = [
    {
      title: "LEGAL DATA",
      align: "center",
      className: "tableHeading",
      children: [
        {
          title: "DETAIL",
          dataIndex: "name",
          key: "name",
          onCell: (_, index) => ({
            colSpan: (index === 2 ) ? 2 : 1,
            className: index === 2 ? "detailValue" : "DetailsClass",
          }),
        },
        
        {
          title: "VALUE",
          dataIndex: "value",
          key: "value",
          className: "tableValues",
          onCell: (_, index) => ({
            colSpan: (index === 2) ? 0 : 1,
          }),
        },
      ],
    },
  ];


  const legal_data = Legal ? Legal.JV ? [
          {
            name: "Joint Venture",
            value: "YES",
            key: "jointVenture",
          },
          {
            name: "Joint Venture Name",
            value: Legal.name,
            key: "JVName",
          },
          {
            name: "Partner's Name and Share (%)",
            key: "partners",
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
            value: Legal["formation date"],
            key: "formationDate",
          },
          {
            name: "GSTIN Number",
            key: "GSTINnumber",
            value: reports? reports.gstin[0] : CMCdata.gstin[0]
          }
        ]
      : [
          {
            name: "Single Bidder",
            key: "singleBidder",
          },
        ]
    : [];
 
  //-----------------------NIT Description--------------------

  const NIT = reports.nit_desc ? reports.nit_desc : undefined;

  const nit_column = [
    {
      title: "NIT DOCUMENT",
      align: "center",
      className: "tableHeading",
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
          className: "tableValues",
        },
      ],
    },
  ];

  const nit_data = NIT
    ? [
        {
          key: 1,
          details: "Work Description",
          value: NIT["Work Description"],
        },
        {
          key: 2,
          details: "Bid Start Date",
          value: NIT["Bid Start Date"],
        },
        {
          key: 3,
          details: "Bid End Date",
          value: NIT["Bid End Date"],
        },
        {
          key: 4,
          details: "Estimated Cost of Work (Cr)",
          value: NIT["Cost of Work"] / 10000000 + " Cr",
        },
        {
          key: 5,
          details: "Period of Completion (Days)",
          value: NIT["Period of Completion (Days)"] + " days",
        },
        {
          key: 6,
          details: "Tender Publication Date",
          value: NIT["Tender Publication Data"],
        },
      ]
    : [];

  //----------------------Working Capital --------------------
  const workCap_Column = [
    {
      title: "WORKING CAPITAL DOCUMENT",
      key: "workincapital",
      className: "tableHeading",
      children: [
        {
          title: "DETAIL",
          key: "details",
          dataIndex: "details",
          className: "DetailsClass"
        },
        {
          title: "VALUE",
          key: "value",
          dataIndex: "value",
          className: "tableValues"
        }
      ]
    }
  ]

  const workCap_data = reports.workcap ?  [
    {
      details: "Document type",
      value: reports.workcap["Type of document"],
      key: 1
    },
    {
      details: "Document Issued date",
      value: CMCdata.workcap["Date of Issue"],
      key: 2
    },
    {
      details: "Working Capital Fund Date",
      value: CMCdata.workcap["Fund date"],
      key: 3
    },
    {
      details: "Working Capital (Cr)",
      value: reports?.workcap["Working Capital"] / 1000000000 + " Cr",
      key: 4
    }

  ]: [];
  //-----------------------Other Part--------------------------

  const other_column = [
    {
      title: "DETAIL",
      dataIndex: "details",
      key: "details",
      onCell: (_, index) => ({
        colSpan: index === 5 ? 2 : 1,
        className: index === 5 ? "detailValue" : "DetailsClass"
      }),
    },
    {
      title: "VALUE",
      dataIndex: "value",
      key: "value",
      className: "tableValues",
      onCell: (_, index) => ({
        colSpan: index === 5 ? 0 : 1,
      }),
    },
  ];

  const other_data = reports.pan ? 
    [
        {
          key: 2,
          details: "GSTIN Number",
          value: reports?.gstin + " (verified)",
        },
        {
          key: 3,
          details: "Power Of Attorny",
          value: reports?.attorney.attorney,
        },
        {
          key: 4,
          details: "Work Simiarity",
          value:
            Math.floor(reports.attorney["work similarity"] * 10000) / 100 +
            " %",
        },
        {
          key: 7,
          details: "Similar Work",
          value: reports.attorney["work similarity"] > 0.95 ? "Yes" : "No",
        },
        {
          key: 5,
          details: "Digital Signature",
          value: reports?.dsc,
        },
        {
          key: 1,
          details: "PAN Details of Partners",
        },
        ...Object.entries(CMCdata.pan).map((each, index) => ({
          key: index + 8,
          details: each[0],
          value: each[1],
        })),
        {
          key: 11,
          details: "UDIN Number",
          value: reports?.workcap["UDIN No"] ,
        },
      ]
    : [];

  //----------------------Undertaking Document-------------------
   const undertaking_column = [
    {
      title: "UNDERTAKING DOCUMENT",
      key: "undertaking",
      className: "tableHeading",
      children: [
        {
          title: "DETAIL",
          key: "details",
          dataIndex: "details",
          className: "DetailsClass"
        },
        {
          title: "VALUE",
          key: "value",
          dataIndex: "value",
          className: "tableValues"
        }

      ]
    }
   ];

   const undertaking_data = reports.undertaking ? [
    {
      key: 1,
      details: "Relatives",
      value: reports.undertaking["any relatives"]
    },
    {
      key: 2,
      details: "Undertaking",
      value: "Undertaking matches with accuracy of " + Math.floor(reports.undertaking.similarity * 10000) / 100 + " %",
    },
   ]: [];

  //----------------------Check Part---------------------------
  const check_column = [
    {
      title:"CHECKS",
      dataIndex: "check",
      key: "check",
      className: "tableHeading",
      children: [
        {
          title: "QUERY",
          key: "query",
          dataIndex: "query",
          className: "DetailsClass"
        },
        {
          title: "STATUS",
          key: "status",
          dataIndex: "status",
          className: "tableValues"
        }
      ]
    }
  ]

  const check_data = reports.legal ? [
    {
      query: "Name of the Joint Venture reamined same throughout the document?",
      status: "YES",
      key: 1
    },
    {
      query: "Bidder's Income is within 3 months of the Tender Issued date?",
      status: "YES",
      key: 2
    },
    {
      query: "Number of Bidders is greater than 3 in JV?",
      status: "NO",
      key: 3
    },
    {
      query: "For the JV, each partner have a partnership share of greater than or equal to 20%",
      status: "NO",
      key: 4
    }
  ] : [];

  //-----------------------Calculations Part---------------------

  //-------COST OF WORK------------
  const costOfWork = NIT ? NIT["Cost of Work"] : 0; // 50 % Cost of work in original Notice
  const halfAnnualTenderValue = NIT ? 0.5 * ((costOfWork * 365) / NIT["Period of Completion (Days)"] ): 0;
  const meanTurnover = reports.workcap
    ? reports?.workcap["Working Capital"]
    : 0;

  // //--------Joint venture------------
  const numOfBidders = Legal?.partners
    ? Object.entries(Legal?.partners).length
    : 0;
  const leadShare = Legal?.partners
    ? Math.max(...Object.values(Legal?.partners))
    : 0;
  const leastShare = Legal?.partners
    ? Math.min(...Object.values(Legal?.partners)) - 0.2
    : 0;

  function Check() {
    if (costOfWork === 0 || meanTurnover === 0 || halfAnnualTenderValue === 0) {
      <Alert
        message="Bid Under Review!"
        description="Your Bid is under review, login after sometime."
        type="info"
      />;
      return;
    }
    if (meanTurnover < halfAnnualTenderValue) {
      return (
        <Alert
          message="Bid Cancelled!"
          description="Mean Turnover is less than tha Cost Of Work in NIT"
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
        {
          <ConfigProvider
            theme={{
              token: {
                fontSize: 13,
              },
              components: {
                Table :{
                  
                }
              }
            }}
          >
            {status === "0" ? (
              <div>
                <Table
                  pagination={false}
                  bordered={true}
                  columns={columns}
                  dataSource={data}
                />
                <br />
                <br />
                <Table
                  bordered={true}
                  pagination={false}
                  columns={legal_columnn}
                  dataSource={legal_data}
                />
                <br />
                <br />
                <Table
                  bordered={true}
                  pagination={false}
                  columns={nit_column}
                  dataSource={nit_data}
                />
                <br />
                <br />
                <Table
                  bordered={true}
                  pagination={false}
                  columns={workCap_Column}
                  dataSource={workCap_data}
                />
                <br />
                <br />
                <Table
                  bordered={true}
                  pagination={false}
                  columns={undertaking_column}
                  dataSource={undertaking_data}
                />
                <br />
                <br />
                <Table
                  bordered={true}
                  pagination={false}
                  columns={other_column}
                  dataSource={other_data}
                />
                <br />
                <br />
                <Table
                  bordered={true}
                  pagination={false}
                  columns={check_column}
                  dataSource={check_data}
                />
                <br />
                <br />
                
              </div>
            ) : (
              message.success("Bider Under Review!")
            )}
          </ConfigProvider>
        }

        <Form
          onSubmit={(e) => handleSubmit(e)}
          // name="basic"
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
          {status === "0" ? (
            Check()
          ) : (
            <Alert
              message="Bid Under Review!"
              description="Your bid is under evaluation."
              type="info"
            />
          )}

          <Button
            style={{ margin: "20px 0px 10px 0px" }}
            type="primary"
            htmlType="submit"
          >
            Logout
          </Button>
          <Button href="/Bidders"  style={{margin: "0px 15px"}}>
            Go back
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CMCPage;