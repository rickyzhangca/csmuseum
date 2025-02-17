'use client';

type TrafficFlowDiagramProps = {
  density: number;
};

export function TrafficFlowDiagram({ density }: TrafficFlowDiagramProps) {
  return <div>Traffic Flow Diagram for {density} density</div>;
}
