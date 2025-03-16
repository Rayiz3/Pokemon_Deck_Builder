import { createEffect, For, on, onMount, type Component } from "solid-js";
import { graphSys } from "../systems/Graph";
import { Colors } from "../property/Color";
import Tooltip from "./tooltip";
import { Size } from "../property/Size";
import { css } from "@emotion/css";

const GraphSectionStyle = css({
  // flex
  flex: 1,
  // position
  position: 'relative',
  // scale
  width: '100%',
  height: '100%',
  // text
  // color
  backgroundColor: Colors.backgroundHover,
  // space
  overflow: "hidden",
  // other
  borderRadius: Size.radius.m,
});

const TeamGraph: Component = () => {
  return(
    <div class={GraphSectionStyle}>
      {/*<Tooltip></Tooltip>*/}
      <svg ref={(el) => (graphSys.svgElement = el)} width="100%" height="100%">
        <g ref={(el) => (graphSys.gElement = el)}>
          {graphSys.curEdges().map((edge) => {
              const sourceNode = graphSys.curNodes().find((n) => n.id === edge.source.id);
              const targetNode = graphSys.curNodes().find((n) => n.id === edge.target.id);

              return (
                sourceNode && targetNode && (
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={
                      graphSys.isInEntryEdges(edge.source.id, edge.target.id)
                      ? Colors.highlight
                      : "black"
                    }
                    stroke-width={edge.weight * 0.2}
                    opacity={
                      graphSys.isAllSelected() ||
                      graphSys.isInEntryEdges(edge.source.id, edge.target.id) ||
                      (graphSys.selectedNode() == edge.source.id) ||
                      (graphSys.selectedNode() == edge.target.id) 
                        ? 1.0
                        : 0.1
                    }
                    onMouseEnter={(e) => graphSys.showTooltip(
                      `Edge: ${edge.source.label} - ${edge.target.label}, # used: ${edge.weight}`, e.clientX, e.clientY
                    )}
                    onMouseLeave={graphSys.hideTooltip}
                    onMouseMove={(e) => graphSys.showTooltip("", e.clientX, e.clientY)}
                  />
                )
              )
            })}

            {graphSys.curNodes().map((node) => (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.value * 25}
                stroke="black"
                fill={
                  graphSys.isAllSelected()
                    ? Colors.main
                    : graphSys.entryNodes.includes(node.id)
                        ? Colors.highlight
                        : (graphSys.selectedNode() == node.id)
                            ? Colors.main
                            : Colors.mainLight
                }
                onClick={() => graphSys.selectNode(node.id)}
                onMouseEnter={(e) =>
                  graphSys.showTooltip(
                    `Node: ${node.label}, Value: ${node.value}`,
                    e.clientX,
                    e.clientY
                  )
                }
                onMouseLeave={graphSys.hideTooltip}
                onMouseMove={(e) => graphSys.showTooltip("", e.clientX, e.clientY)}
              />
            ))}
        </g>
      </svg>
    </div>
  )
};

export default TeamGraph;