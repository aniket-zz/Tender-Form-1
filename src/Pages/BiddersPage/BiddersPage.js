import React, { useEffect, useState } from "react";
import { Space, Button, Form, Alert, Table, ConfigProvider } from "antd";
// import { BidderList } from "./Dummy";
import { useNavigate } from "react-router-dom";
// import EachBidder from "./EachBidder";
import customFetch from "../../utils/axios";
const { Column, ColumnGroup } = Table;

const BiddersPage = (props) => {
  const navigate = useNavigate();
  const usrToken = localStorage.getItem("token");

  const [detail, setDetails] = useState({ tenderType: "cmc", nit: {} });
  const [status, setStatus] = useState(1);
  const [BidderList, setBidderList] = useState([]);


  const onFinish = async (values) => {
    console.log(values);
    navigate("/Details");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const HandleClick = (index) => {
    props.setIndex(index);
    detail.tenderType === "cmc" ? navigate("/cmc") : navigate("/civil");
  };

  // function NextPage(index) {
  //   props.setIndex(index)
  //   console.log("Executed!");
  // }

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
          const list = resp.data.bidder_list;
          
          setBidderList(list);
          if (list[0].status === "0") {
            const detail = JSON.parse(list[0]?.details);
            const report = JSON.parse(list[0]?.output);
            setDetails({
              tenderType: detail.TenderType,
              nit: report.nit_desc,
            });
            const temp = list[0].status;
            setStatus(temp);
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

  console.log(detail);

  // ------------------NIT Information---------------------------
  const NIT = detail?.nit ? detail.nit : undefined;

  const data = NIT
    ? [
        {
          detail: "Work Description",
          value: NIT["Work Description"],
          key: "workdesc",
        },
        {
          detail: "BID Start Date",
          value: NIT["Bid Start Date"],
          key: "bidstart",
        },
        {
          detail: "BID End Date",
          value: NIT["Bid End Date"],
          key: "bidend",
        },
        {
          detail: "Tender Publish Date",
          value: NIT["Tender Publication Data"],
          key: "publishdate",
        },
        {
          detail: "Completion Period (Days)",
          value: NIT["Period of Completion (Days)"] + " Days",
          key: "completion",
        },
        {
          detail: "Cost of Work (Rs)",
          value: "Rs " + NIT["Cost of Work"],
          key: "workcost",
        },
      ]
    : [];

  // ------------------Bidders List---------------------------

  // const link = detail.tenderType === "cmc" ? "/cmc" : "/civil";
    
  
  const bidder_data = BidderList.map((each, index) => {
    const {companyName, BidderRefNo} = JSON.parse(each.details);
    return {
      SNo: index + 1,
      bidderName: companyName,
      refNo: BidderRefNo,
    };
  });

  //---------------------------main div----------------------

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
        Bidder's List
      </h3>
      <p
        style={{
          fontFamily: "verdana",
          fontSize: "1rem",
          padding: "0rem 5rem",
        }}
      >
        NIT Document Information
      </p>
      <div className="login_div">
        {status === "0" ? (
          <ConfigProvider
            theme={{
              token: {
                fontSize: 13,
              },
            }}
          >
            <Table bordered={true} pagination={false} dataSource={data}>
              <ColumnGroup
                title="NIT Document information"
                className="tableHeading"
                colSpan={2}
              >
                <Column
                  title="Detail"
                  dataIndex="detail"
                  key="detail"
                  className="detailValue"
                  colSpan={0}
                />
                <Column
                  title="Value"
                  dataIndex="value"
                  key="value"
                  className="tableValues"
                  colSpan={0}
                />
              </ColumnGroup>
            </Table>
          </ConfigProvider>
        ) : (
          <Alert
            message="NIT Information"
            description="Enter at least one bidder to show the information."
            type="info"
          />
        )}

        <br />
        <p
          style={{
            fontFamily: "verdana",
            fontSize: "1rem",
          }}
        >
          Bidders List
        </p>

        {/* <EachBidder
          bidderList={BidderList}
          tenderType={detail.tenderType}
          passIndex={NextPage}
        /> */}

        <ConfigProvider
          theme={{
            token: {
              fontSize: 13,
            },
          }}
        >
          <Table bordered={true} pagination={false} dataSource={bidder_data}>
            <ColumnGroup title="Bidders List" className="tableHeading">
              <Column
                title="Serial No."
                dataIndex="SNo"
                key="SNo"
                className="detailValue"
              />
              <Column
                title="Bidder Name"
                dataIndex="bidderName"
                key="BidderName"
                className="tableValues"
                render={(_, record) => (
                  <Space size="middle">
                    <span
                      onClick={() => {
                        HandleClick(record.SNo - 1);
                      }}
                      style={{
                        color: "#0764BA",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                      title={"Click to view details"}
                    >
                      {record.bidderName}
                    </span>
                  </Space>
                )}
              />
              <Column
                title="Reference No."
                dataIndex="refNo"
                key="refNo"
                className="tableValues"
              />
            </ColumnGroup>
          </Table>
        </ConfigProvider>

        <br />

        <Form
          style={{
            left: "0rem",
            textAlign: "center",
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
          >
            Add a New Bidder
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default BiddersPage;
