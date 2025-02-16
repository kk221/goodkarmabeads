'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Stars({ count = 5000 }) {
  const mesh = useRef()
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2000
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
  }

  useFrame(() => {
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
      <pointsMaterial size={1.5} sizeAttenuation color="#d3ae8b" transparent opacity={0.8} />
    </points>
  )
}

export default function StarryBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  )
}