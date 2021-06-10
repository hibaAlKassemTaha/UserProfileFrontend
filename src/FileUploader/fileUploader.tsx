import React, { FC } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";

const { Dragger } = Upload;

type FileUploaderProps = {
  onUpload: (file: RcFile | undefined) => void;
};
const FileUploader: FC<FileUploaderProps> = (props: FileUploaderProps) => {
  const { onUpload } = props;
  return (
    <Dragger
      name="file"
      multiple={false}
      onRemove={() => {
        onUpload(undefined);
      }}
      beforeUpload={(file) => {
        onUpload(file);
        return false;
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </Dragger>
  );
};

export default FileUploader;
