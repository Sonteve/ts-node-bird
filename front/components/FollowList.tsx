import React, { useCallback, useMemo } from "react";
import { Button, Card, List } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { removeFollower, unfollowAction } from "../reducers/user";

interface Props {
  header: "팔로잉" | "팔로워";
  data: { id: number; nickname?: string }[];
}

const FollowList = ({ header, data }: Props) => {
  const dispatch = useDispatch();
  const grid = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), []);

  const onCancel = useCallback((id) => {
    if (header === "팔로잉") {
      dispatch(unfollowAction.request({ id }));
    } else if (header === "팔로워") {
      dispatch(removeFollower.request({ id }));
    }
  }, []);
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
          <Card
            actions={[
              <StopOutlined key="stop" onClick={() => onCancel(item.id)} />,
            ]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;
