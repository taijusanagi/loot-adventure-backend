import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';

const CustomNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom
}: NodeProps) => {
  return (
    <>
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
      />
      {data?.label}
      <Image src={data?.img} alt={data?.label} height={100} width="100%" />
      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
      />
    </>
  );
};

CustomNode.displayName = "CustomNode";

export default memo(CustomNode);
