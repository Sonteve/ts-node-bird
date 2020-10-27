import React, { useMemo } from "react";
import { Button, Card, List } from "antd";
import { StopOutlined } from "@ant-design/icons";

interface Props {
  header: "팔로잉 목록" | "팔로워 목록";
  data: { nickname: string }[];
}

const FollowList = ({ header, data }: Props) => {
  const grid = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), []);
  return (
    <List
      style={{ marginBottom: 20 }}
      grid={grid}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: " 10px 0" }}>
          <Button>더보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;
