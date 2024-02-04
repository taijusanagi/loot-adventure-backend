import { useCallback } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState
} from "reactflow";
import 'reactflow/dist/style.css';

import CustomNode from "./Node/CustomNode";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    data: { label: "Custom Node", img:"https://img.tofunft.com/v2/1/0x6144d927ee371de7e7f8221b596f3432e7a8e6d9/953/720/static.jpg" },
    position: { x: 250, y: 5 }
  },
  { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 250 } },
  { id: "3", data: { label: "Node 3" }, position: { x: 400, y: 250 } },
    
  ];
  
  const initialEdges: Edge[] = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" }
  ];
  
  const nodeTypes = {
    custom: CustomNode
  };
  
  const AccountFlow = () => {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
      (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
      [setEdges]
    );
  
    return (
      <div style={{ height: '300px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Background />
        </ReactFlow>
      </div>
    );
  };
  
  export default AccountFlow;
  