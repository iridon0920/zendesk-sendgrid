import React from "react";

// Hello コンポーネントの属性（プロパティ）を定義
interface HelloProps {
  name?: string; // オプショナルな name 属性
}

// Hello コンポーネントを定義
export class Hello extends React.Component<HelloProps> {
  public render(): React.ReactNode {
    const name = this.props.name ?? "Unknown";
    return <div>Hello, {name}!</div>;
  }
}
