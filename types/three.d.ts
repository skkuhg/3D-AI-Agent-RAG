
declare module '@react-three/fiber' {
  interface ThreeElements {
    mesh: any;
    sphereGeometry: any;
    meshStandardMaterial: any;
    ambientLight: any;
    directionalLight: any;
    group: any;
  }
}

declare module '@react-three/drei' {
  export const OrbitControls: any;
  export const Sphere: any;
  export const Text3D: any;
}
