"use client";
import { Component } from "react";

// Se o WebGL não estiver disponível, o site continua funcionando sem o 3D.
export default class ErrorBoundary extends Component {
  state = { erro: false };
  static getDerivedStateFromError() { return { erro: true }; }
  componentDidCatch() {}
  render() { return this.state.erro ? this.props.fallback ?? null : this.props.children; }
}
