// Shared by GlassHero and StlViewer -- both used to reimplement this
// independently (confirmed by a graphify path query between the two files,
// which found no shared code between them beyond both importing react).
import { Component } from "react";

export function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")));
  } catch (err) {
    return false;
  }
}

export class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
