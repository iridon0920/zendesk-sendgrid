import React from "react";
import { Row, Col } from "@zendeskgarden/react-grid";
import { Dots } from "@zendeskgarden/react-loaders";
export const Loader: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}) => {
  return (
    <Row style={style}>
      <Col textAlign="center">
        <Dots />
      </Col>
    </Row>
  );
};
