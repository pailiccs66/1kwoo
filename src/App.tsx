import React from "react";
import { Layout } from "@/components/layout/Layout";
import Persona from "@/pages/Persona";
import POSMatrix from "@/pages/POSMatrix";
import SceneSimulation from "@/pages/SceneSimulation";
import Operations from "@/pages/Operations";
import AIProductivity from "@/pages/AIProductivity";
import { useElasticScroll } from "@/hooks/useElasticScroll";

export default function App() {
  useElasticScroll();

  return (
    <Layout>
      <Persona />
      <POSMatrix />
      <SceneSimulation />
      <AIProductivity />
      <Operations />
    </Layout>
  );
}
