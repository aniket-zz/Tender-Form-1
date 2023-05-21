import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Form, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "react-s3";
// import { Buffer } from "buffer";

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

const config = {
  bucketName: process.env.S3_BUCKET,
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

const UploadForm = (props) => {
  const navigate = useNavigate();
  var links = {};

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("success: ", values);
    console.log("working", props.user);
    props.token ? navigate("/Success") : navigate("/");
  };

  const handleUpload = async (info) => {
    const { onSuccess, onError } = info;
    var doc = info.file;
    
    uploadFile(doc, config)
      .then((data) => {
        const name = info.filename;
        if (data.result.status === 204) {
          links = {[name]: data.location, ...links}
          console.log(links);
          onSuccess(
            message.success(
              `${info.file.name} file uploaded successfully`
            )
          );
        } else if (data.result.status !== 204) {
          onError(`${info.file.name} file upload failed.`);
        }
      })
      .catch((err) => {
        console.log("Eroor: ", err);
        onError(`${info.file.name} file upload failed.`);
      });
  }

  const prop = {
    maxCount: 1,

    // action: "https://reqres.in/api/users", // API endpoint to be entered here
    // headers: {
    //   authorization: "authorization-text",
    // },
    // onChange(info) {
    //   if (info.file.status === "done") {
    //     // message.success(`${info.file.name} file uploaded successfully`);
    //     console.log("File uploaded!");
    //   } else if (info.file.status === "error") {
    //     // message.error(`${info.file.name} file upload failed.`);
    //     console.log("File upload failed");
    //   }
    // },
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

{/* ---------------LEGAL DOCUMENT------------------- */}
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
              name="LegalDocument"
              {...prop}
              customRequest={handleUpload}

                // formData.append("PAN", doc);
                // try{
                //   let uploadURLRes = await axios.get('http://localhost:5000/getuploadurl');
                //   let res = await axios.post(uploadURLRes.message, formData, {     // API of the service used to upload the document
                //   headers: {
                //     "Content-Type": "multipart/form-data",
                //   },
                //   });
                //   await axios.post('http://localhost:5000/uploaddetails',res)

                // onSuccess(message.success(`${info.file.name} file uploaded successfully`));
                // }
                // catch(err){
                //   console.log("Eroor: ", err);
                //   onError(`${info.file.name} file upload failed.`);
                // }
                // if (info.file.status !== "uploading") {
                //   console.log(info.file, info.fileList);
                // }
                // if (info.file.status === "done") {
                //   message.success(
                //     `${info.file.name} file uploaded successfully`
                //   );
                // } else if (info.file.status === "error") {
                //   message.error(`${info.file.name} file upload failed.`);
                // }
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>


{/* ---------------CA CERTIFICATE------------------- */}
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
              name="CACertificate"
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
              customRequest={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

{/* ---------------PAN CERTIFICATE------------------- */}
          <Form.Item
            name="PAN"
            label="PAN Document of the Bidder"
            rules={[
              {
                required: true,
                message: "Please upload your PAN Document",
              },
            ]}
            labelCol={{ span: "13", offset: "0" }}
          >
            <Upload
              name="PAN"
              {...prop}
              customRequest={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

{/* ---------------GSTIN DOCUMENT------------------- */}
          <Form.Item
            name="GSTIN"
            label="GSTIN Document"
            rules={[
              {
                required: true,
                message: "Please upload your GSTIN Document",
              },
            ]}
            labelCol={{ span: "12", offset: "1" }}
          >
            <Upload
              name="GSTIN"
              {...prop}
              customRequest={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>


{/* ---------------WORK EXPERIENCE------------------- */}
          <Form.Item
            name="WorkExperience"
            label="Work Experience document of the bidder"
            rules={[
              {
                required: true,
                message: "Please upload your Work Experience Document",
              },
            ]}
            labelCol={{ span: "13", offset: "0" }}
          >
            <Upload
              name="WorkExperience"
              {...prop}
              customRequest={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>


{/* ---------------WORKING CAPITAL------------------- */}
          <Form.Item
            name="WorkingCapital"
            label="Working Capital Document"
            rules={[
              {
                required: true,
                message: "Please upload your Working Capital Document",
              },
            ]}
            labelCol={{ span: "12", offset: "1" }}
          >
            <Upload
              name="WorkingCapital"
              {...prop}
              customRequest={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>


{/* ---------------DIGITAL SIGNATURE------------------- */}
          <Form.Item
            name="DigitalSignature"
            label="Digital Signature of the bidder"
            rules={[
              {
                required: true,
                message: "Please upload your Digital Signature",
              },
            ]}
            labelCol={{ span: "13", offset: "0" }}
          >
            <Upload
              name="DigitalSignature"
              {...prop}
              customRequest={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

{/* ----------------------SUBMIT BUTTON-------------------------- */}
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

// const UploadFiles = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileInput = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = async (file) => {
//     uploadFile(file, config)
//       .then((data) => {
//         if (data.result.status === 204) {
//           message.success(`${data.key} file uploaded successfully`);
//         } else if (data.result.status !== 204) {
//           message.error(`${data.key} file upload failed.`);
//         }
//         console.log("data", data);
//       })
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div>
//       <div>React S3 File Upload</div>
//       <input type="file" onChange={handleFileInput} />
//       <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
//     </div>
//   );
// };
// export default UploadFiles;