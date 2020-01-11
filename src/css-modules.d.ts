declare module "*.scss" {
  const styles: { [className: string]: string };
  export default styles;
}

declare interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
    const content: SvgrComponent
    export default content
}