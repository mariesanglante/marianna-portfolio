"use client";
import { TCCCFullReplica } from "./tccc-full-replica";
import "./tccc-full-replica.css";
import "./tccc-material.css";

export function TCCCActualPrototype() {
  return (
    <section aria-label="Interactive TCCC digital casualty card" className="tccc-native-section">
      <div className="tccc-native-heading">
        <div><span className="tccc-native-eyebrow">INTERACTIVE PRODUCT / SEVEN-CHAPTER WORKFLOW</span>
        <h2>Experience the product.</h2><p>A native, interactive TCCC card built into this case study. Explore the documentation flow, patient records, vital signs, treatment and responder details.</p></div>
        <span className="tccc-native-indicator"><span/> LIVE INTERACTION</span>
      </div>
      <TCCCFullReplica />
    </section>
  );
}
