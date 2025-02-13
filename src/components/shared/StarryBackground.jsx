'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import { zodiacSymbols } from '@/lib/constants'

function Stars({ count = 5000 }) {
  const mesh = useRef()
  const positions = new Float32Array(count * 3)
  
  for(let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 100
    positions[i + 1] = (Math.random() - 0.5) * 100
    positions[i + 2] = (Math.random() - 0.5) * 100
  }

  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.05
    mesh.current.rotation.y += delta * 0.075
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#d3ae8b"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingZodiacSigns() {
  const group = useRef()
  
  useFrame((state) => {
    group.current.rotation.y += 0.001
    group.current.children.forEach((child, i) => {
      child.position.y = Math.sin(state.clock.elapsedTime + i) * 0.5
    })
  })

  return (
    <group ref={group}>
      {zodiacSymbols.map((symbol, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 12) * Math.PI * 2) * 20,
            0,
            Math.sin((i / 12) * Math.PI * 2) * 20
          ]}
        >
          <textGeometry args={[symbol, { size: 2, height: 0.1 }]} />
          <meshStandardMaterial color="#d3ae8b" />
        </mesh>
      ))}
    </group>
  )
}

export default function StarryBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 30] }}>
        <ambientLight intensity={0.5} />
        <Stars />
        <FloatingZodiacSigns />
      </Canvas>
    </div>
  )
}