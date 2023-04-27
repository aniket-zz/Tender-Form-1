import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Form, Upload } from "antd";
import { useNavigate } from "react-router-dom";

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

const UploadForm = (props) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("success: ", values);
    console.log("working", props.user);
    props.user ? navigate("/Success") : navigate("/");
  };

  const prop = {
    action: "https://reqres.in/api/users", // API endpoint to be entered here
    maxCount: 1,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

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
        <p className="upload_title">Bid Documents</p>

        <Form
          {...formItemLayout}
          form={form}
          name="Upload"
          onFinish={onFinish}
          labelWrap
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="LegalDocument"
            label="Legal Document"
            rules={[
              {
                required: true,
                message: "Please upload your Leagal Document",
              },
            ]}
            labelCol={{ span: "12", offset: "1" }}
          >
            <Upload
              name="PAN"
              {...prop}
              // customRequest={async (info) => {
              //   const { onSuccess, onError } = info;

              //   var formData = new FormData();
              //   var doc = info.file;
              //   console.log(doc);
              //   formData.append("PAN", doc);
              //   try{
              //     let uploadURLRes = await axios.get('http://localhost:5000/getuploadurl');
              //     let res = await axios.post(uploadURLRes.message, formData, {     // API of the service used to upload the document
              //     headers: {
              //       "Content-Type": "multipart/form-data",
              //     },
              //     });
              //     await axios.post('http://localhost:5000/uploaddetails',res)

              //   onSuccess(message.success(`${info.file.name} file uploaded successfully`));
              //   }catch(err){
              //     console.log("Eroor: ", err);
              //     onError(`${info.file.name} file upload failed.`);
              //   }
              //   // if (info.file.status !== "uploading") {
              //   //   console.log(info.file, info.fileList);
              //   // }
              //   // if (info.file.status === "done") {
              //   //   message.success(
              //   //     `${info.file.name} file uploaded successfully`
              //   //   );
              //   // } else if (info.file.status === "error") {
              //   //   message.error(`${info.file.name} file upload failed.`);
              //   // }
              // }}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="CACertificate"
            label="CA Certificate of the bidder"
            rules={[
              {
                required: true,
                message: "Please upload your CA certificate",
              },
            ]}
            labelCol={{ span: "13", offset: "0" }}
          >
            <Upload
              name="GSTIN"
              maxCount={1}
              // customRequest={(e) => {
              //   var formData = new FormData();
              //   var doc = e.file;
              //   console.log(doc);
              //   formData.append("GSTIN", doc);
              //   axios.post("https://reqres.in/api/users", formData, {
              //     headers: {
              //       "Content-Type": "multipart/form-data",
              //     },
              //   });
              // }}
              {...prop}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          {/* <Form.Item
            name="SatisfactoryWork"
            label="Satisfactory work completion Certificate"
            rules={[
              {
                required: true,
                message:
                  "Please upload your Satisfactory work completion Certificate",
              },
            ]}
            labelCol={{ span: "12", offset: "1" }}
          >
            <Upload name="Satisfactory" {...prop}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item> */}

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default UploadForm;
