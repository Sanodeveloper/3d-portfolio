import { Scroll, ScrollControls, Image, useScroll, OrbitControls, useTexture, useGLTF, Text } from '@react-three/drei';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { easing } from 'maath';
import { degToRad } from 'three/src/math/MathUtils.js';

function ImgItem({url, scale, position, id}) {
  const num = 11;
  const ref = useRef();
  const scroll = useScroll();

  useFrame((state, delta) => {
    const y = scroll.curve(1 / num * id - 1 / num / 2, 1 / num);
    easing.damp3(ref.current.scale, [2, 3 + y, 1], 0.15, delta);
    ref.current.material.scale.x = ref.current.scale.x;
    ref.current.material.scale.y = ref.current.scale.y;
    easing.damp(ref.current.material, "grayscale", Math.max(0, 1 - y), 0.15, delta);
  });
  return(
    <Image ref={ref} url={url} scale={scale} position={position} grayscale={1} color="white"/>
  );
}

function Floor({x, z}) {
  const floortexture = useTexture({
    map: "./texture/floor/coast_sand_rocks_02_diff_4k.jpg",
    displacementMap: "./texture/floor/coast_sand_rocks_02_disp_4k.png",
    aoMap: "./texture/floor/coast_sand_rocks_02_arm_4k.jpg",
    roughnessMap: "./texture/floor/coast_sand_rocks_02_arm_4k.jpg",
    metalnessMap: "./texture/floor/coast_sand_rocks_02_arm_4k.jpg",
    normalMap: "./texture/floor/coast_sand_rocks_02_nor_gl_4k.jpg"
  });
  return(
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[x, -2, z]} receiveShadow>
      <planeGeometry args={[10, 10, 128, 128]} />
      <meshStandardMaterial {...floortexture} displacementScale={0.2} />
    </mesh>
  );
}

function Tree({x, y, z}) {
  const model = useGLTF("./texture/tree/tree_small_02_4k.gltf");
  return (
    <mesh scale={[2, 2, 2]} position={[x, y, z]}>
       <primitive object={model.scene.clone()} />
    </mesh>
  );
}

function Chair({x, y, z}) {
  const model = useGLTF("./texture/chair/Rockingchair_01_4k.gltf");
  return (
    <mesh scale={[1.5, 1.5, 1.5]} position={[x, y, z]} rotation={[0, Math.PI, 0]} receiveShadow castShadow>
      <primitive object={model.scene.clone()} />
    </mesh>
  );
}

function TV({scale, position, rotation, lightPosition, isLight}) {
  const model = useGLTF("./texture/tv/Television_01_2k.gltf");
  return (
    <group>
      { isLight && <rectAreaLight args={[null, 10, 2, 2]} rotation-y={rotation[1] + Math.PI} position={lightPosition}/> }
      <mesh scale={scale} position={position} rotation-y={rotation} receiveShadow castShadow>
        <primitive object={model.scene.clone()} />
      </mesh>
    </group>
  );
}

function TitleText({title}) {
  const str = title.join("\n");
  return (
    <Text scale={[0.2, 0.2, 0.2]} position={[2.8, -1, 1.8]} rotation-y={degToRad(-90)} font='./fonts/Jersey25-Regular.ttf'>{str}</Text>
  );
}


function App() {

  return (
    <Canvas className='main' camera={{position: [0, 0, 5]}} shadows>
      {/* <spotLight intensity={40} distance={15} position={[0, 5, 0]}/> */}
      {/* <ambientLight intensity={5}/> */}
      <pointLight intensity={10} castShadow/>
      <ScrollControls horizontal={true} pages={2.73} damping={0.1} >
        <Scroll>
          <ImgItem url="./neon.jpg" scale={[2, 3, 1]} position={[0, 0, 0]} id={0}/>
          <ImgItem url="./load1.jpg" scale={[2, 3, 1]} position={[2.5, 0, 0]} id={1}/>
          <ImgItem url="./load2.jpg" scale={[2, 3, 1]} position={[5, 0, 0]} id={2}/>
          <ImgItem url="./load3.png" scale={[2, 3, 1]} position={[7.5, 0, 0]} id={3}/>
          <ImgItem url="./saiber.jpg" scale={[2, 3, 1]} position={[10, 0, 0]} id={4}/>
          <ImgItem url="./saiber2.jpg" scale={[2, 3, 1]} position={[12.5, 0, 0]} id={5} />
          <ImgItem url="./capital1.jpg" scale={[2, 3, 1]} position={[15, 0, 0]} id={6}/>
          <ImgItem url="./eurpe1.jpg" scale={[2, 3, 1]} position={[17.5, 0, 0]} id={7}/>
          <ImgItem url="./eurpe2.jpg" scale={[2, 3, 1]} position={[20, 0, 0]} id={8}/>
          <ImgItem url="./capital2.jpg" scale={[2, 3, 1]} position={[22.5, 0, 0]} id={9}/>
          <ImgItem url="./eurpe3.jpg" scale={[2, 3, 1]} position={[25, 0, 0]} id={10}/>
          <ImgItem url="./eurpe4.jpg" scale={[2, 3, 1]} position={[27.5, 0, 0]} id={11}/>
        </Scroll>
        <Floor x={0} z={-2}/>
        <Floor x={3} z={-2}/>
        <Floor x={0} z={0}/>
        <Floor x={3} z={0} />
        <Tree x={-3} y={-2} z={2} />
        <Tree x={2} y={-2} z={-2} />
        <Tree x={3} y={-2} z={3} />
        <Chair x={0} y={-2} z={3} />
        <TV scale={[2, 2, 2]} position={[2, -2, 1]} rotation={-Math.PI / 4} lightPosition={null} isLight={false}/>
        <TV scale={[4.5, 3.6, 3.5]} position={[3.5, -2, 2]} rotation={-Math.PI / 2} lightPosition={[3.3, -2, 2.2]} isLight={false}/>
        <TV scale={[2, 2, 2]} position={[3.5, -0.35, 2]} rotation={-Math.PI / 2}  lightPosition={null} isLight={false}/>
        <TV scale={[3, 3, 3]} position={[-3, -2, -1.5]} rotation={Math.PI / 4}  lightPosition={null} isLight={false}/>
        <TV scale={[3, 3, 3]} position={[-2, -2, 3]} rotation={Math.PI * 2 / 3}  lightPosition={null} isLight={false}/>
        <TV scale={[2, 2, 2]} position={[-2, -0.65, 3]} rotation={Math.PI * 2 / 3}  lightPosition={null} isLight={false}/>
        <TitleText title={["Hello !!", "This is My Portfolio !"]} />
      </ScrollControls>
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

export default App;
