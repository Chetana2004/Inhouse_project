import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Button, Card, Tag } from "antd";
import { BomContext } from "../context/BomContext";
import "./BomView.css";

const BomView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { boms } = useContext(BomContext);
  const bom = boms.find((b) => b.id === id);

  if (!bom) {
    return <div>BOM not found</div>;
  }

  return (
    <div className="view-bom-container">
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        Back to List
      </Button>

      <Card title="BOM Details">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="BOM ID">{bom.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{bom.name}</Descriptions.Item>
          <Descriptions.Item label="Product">{bom.product}</Descriptions.Item>
          <Descriptions.Item label="Version">{bom.version}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={bom.status === "Active" ? "green" : "orange"}>
              {bom.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Created Date">
            {bom.createdDate}
          </Descriptions.Item>
          <Descriptions.Item label="Last Modified">
            {bom.lastModified}
          </Descriptions.Item>
          <Descriptions.Item label="Components">
            <ul>
              {bom.items?.map((item, index) => (
                <li key={index}>
                  {item.itemCode} - {item.quantity} {item.unit} ($
                  {item.unitPrice?.toFixed(2)} each)
                </li>
              ))}
            </ul>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default BomView;
