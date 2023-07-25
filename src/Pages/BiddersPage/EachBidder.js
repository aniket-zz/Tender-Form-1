import { Space, Table, ConfigProvider } from "antd";
const { Column, ColumnGroup } = Table;

const EachBidder = (props) => {
  const data = props.bidderList.map((each, index) => {
    return {
      SNo: index + 1,
      bidderName: each.bidderName,
      refNo: each.refNo,
    };
  });

  const link = props.tenderType === "cmc" ? "/cmc" : "/civil";

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 13,
          },
        }}
      >
        <Table bordered={true} pagination={false} dataSource={data}>
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
                  <a
                    href= {link}
                    onClick={() => {
                      props.passIndex(0);
                    }}
                  >
                    {record.bidderName}
                  </a>
                  {/* {props.tenderType === "cmc" ? (
                    <a
                      href="/cmc"
                      onClick={() => {
                        props.passIndex(record.SNo - 1);
                      }}
                    >
                      {record.bidderName}
                    </a>
                  ) : (
                    <a href="/civil">{record.bidderName}</a>
                  )} */}
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
    </div>
  );
};

export default EachBidder;
