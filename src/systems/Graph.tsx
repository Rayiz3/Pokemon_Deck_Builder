import { forceSimulation, forceLink, forceManyBody, forceCenter } from "d3-force";
import { select } from "d3-selection";
import { zoom, zoomTransform } from "d3-zoom";
import { Accessor, createSignal, Setter } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { dataSys } from "./Data";
import { entrySys } from "./Entry";

interface nodeType {
    label: string;
    value: number;
    id: number;
    x?: number;
    y?: number;
}

interface edgeType {
    weight: number;
    source: nodeType;
    target: nodeType;
}

class GraphSys {
    curNodes: Accessor<nodeType[]>
    setCurNodes: Setter<nodeType[]>

    curEdges: Accessor<edgeType[]>
    setCurEdges: Setter<edgeType[]>

    isAllSelected: Accessor<boolean>
    setIsAllSelected: Setter<boolean>

    selectedNode: Accessor<number>
    setSelectedNode: Setter<number>

    entryNodes: number[]
    setEntryNodes: SetStoreFunction<number[]>

    entryEdges: {source: number, target: number}[]
    setEntryEdges: SetStoreFunction<{source: number, target: number}[]>

    constructor() {
        ([this.curNodes, this.setCurNodes] = createSignal<nodeType[]>([])),
        ([this.curEdges, this.setCurEdges] = createSignal<edgeType[]>([])),
        ([this.isAllSelected, this.setIsAllSelected] = createSignal<boolean>(true)),
        ([this.selectedNode, this.setSelectedNode] = createSignal<number>(-1)),
        ([this.selectedNode, this.setSelectedNode] = createSignal<number>(-1)),
        ([this.entryNodes, this.setEntryNodes] = createStore<number[]>([])),
        ([this.entryEdges, this.setEntryEdges] = createStore<{source: number, target: number}[]>([]))
    }

    nodes: nodeType[] = []
    edges: edgeType[] = []
    svgElement!: SVGSVGElement
    gElement!: SVGGElement

    tooltipDiv: HTMLDivElement | undefined;

    initialize = async () => {
        const response = await fetch("/graph.json");
        const jsonData = await response.json();

        this.nodes = jsonData.nodes;
        this.edges = jsonData.links;

        this.setCurNodes(this.nodes);
        this.setCurEdges(this.edges);

        this.plotGraph();
        this.moveGraph();
    }

    plotGraph = () => {
        const { width, height } = this.svgElement.getBoundingClientRect();

        forceSimulation(this.curNodes())
            .force("link", forceLink(this.edges) // attractive force
                .id((d: any) => d.id)
                .strength((d: any) => d.weight / 200))
            .force("charge", forceManyBody().strength(-200)) // repulsive force
            .force("center", forceCenter(width / 2, height / 2)) // enforce centering
            .on("tick", () => {
                this.setCurNodes([...this.curNodes()]);
            })
        this.setCurNodes(this.curNodes());
        this.setCurEdges(this.curEdges());
    }

    moveGraph = () => {
        const zoomBehavior = zoom().scaleExtent([0.5, 5]) // Min and max zoom levels
                                   .on("zoom", (e) => {
                                        select(this.gElement).attr("transform", e.transform);
                                   });
  
        select(this.svgElement).call(zoomBehavior as any);
    }

    selectNode = (id: number) => {
        this.setIsAllSelected(false);
        if (this.selectedNode() == id) {
            this.setSelectedNode(-1);
            if (!this.entryNodes.includes(id)){
                this.setIsAllSelected(true);
            }
            dataSys.resetCurPokemonInfo();
        } else {
            this.setSelectedNode(id);
            entrySys.setCurFocused(-1);
            dataSys.getPokemonInfo(this.nodes[id].label);
        }
    }

    isInEntryEdges = (sid: number, tid: number) => {
        for (const entryEdge of graphSys.entryEdges){
            if (entryEdge.source == sid && entryEdge.target == tid){
                return true
            }
        }
        return false
    }

    updateSelectedNodes = (nodeNames: string[]) => {
        console.log(nodeNames);
        if (nodeNames.length == 0){
            this.setEntryNodes([]);
            this.setEntryEdges([]);
            this.setCurNodes(this.nodes);
            this.setCurEdges(this.edges);
            this.plotGraph();
            return
        }
        
        const selectedNodeSet = new Set<number>();
        const nodeIndicies: number[] = [];
        const edgeIndicies: {source: number, target: number}[] = [];

        this.nodes.map((node) => {
            if (nodeNames.includes(node.label)) {
                selectedNodeSet.add(node.id);
                nodeIndicies.push(node.id);
                return true;
            }
            return false;
        });

        this.setEntryNodes(nodeIndicies);

        console.log(this.entryEdges, this.entryNodes);

        for (const source of nodeIndicies){
            for (const target of nodeIndicies){
                edgeIndicies.push({source: source, target: target});
            }
        }
        this.setEntryEdges(edgeIndicies);

        const selectedEdges = this.edges.filter((edge) => {
            const isSourceSelected = nodeIndicies.includes(edge.source.id);
            const isTargetSelected = nodeIndicies.includes(edge.target.id);

            if (isSourceSelected) selectedNodeSet.add(edge.target.id);
            if (isTargetSelected) selectedNodeSet.add(edge.source.id);

            return isSourceSelected || isTargetSelected;
        });
        const selectedNodes = this.nodes.filter((node) => selectedNodeSet.has(node.id));

        this.setCurNodes(selectedNodes);
        this.setCurEdges(selectedEdges);
        this.plotGraph();
    }

    showTooltip = (content: string, x: number, y: number) => {
      if (this.tooltipDiv) {
        this.tooltipDiv.style.display = "block";
        this.tooltipDiv.style.left = `${x + 10}px`;
        this.tooltipDiv.style.top = `${y + 10}px`;
        this.tooltipDiv.innerHTML = content;
      }
    };
  
    hideTooltip = () => {
      if (this.tooltipDiv) {
        this.tooltipDiv.style.display = "none";
      }
    };
}

export const graphSys = new GraphSys()