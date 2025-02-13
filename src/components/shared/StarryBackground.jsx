'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, Center } from '@react-three/drei'
import { zodiacSymbols } from '@/lib/utils/constants'

function Stars({ count = 5000 }) {
  const mesh = useRef()
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2000
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
  }

  useFrame((state) => {
    mesh.current.rotation.x += 0.0001
    mesh.current.rotation.y += 0.0001
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
        size={1.5}
        sizeAttenuation={true}
        color="#d3ae8b"
        transparent
        opacity={0.8}
      />
    </points>
  )
}

function ZodiacSymbols() {
  const group = useRef()

  useFrame((state) => {
    group.current.rotation.y += 0.001
  })

  return (
    <group ref={group}>
      {zodiacSymbols.map((zodiac, index) => {
        const angle = (index / zodiacSymbols.length) * Math.PI * 2
        const radius = 100
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <Center key={zodiac.name} position={[x, 0, z]}>
            <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={10}
              height={2}
              curveSegments={12}
            >
              {zodiac.symbol}
              <meshStandardMaterial color="#d3ae8b" />
            </Text3D>
          </Center>
        )
      })}
    </group>
  )
}

export default function StarryBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 200], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <ZodiacSymbols />
      </Canvas>
    </div>
  )
}