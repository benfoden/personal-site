import { useEffect, createRef, useState, useCallback, useRef, forwardRef } from 'react';
import styles from './Animation.module.scss'
import { Scene, Vector3, WebGLRenderer, sRGBEncoding, OrthographicCamera, AmbientLight } from 'three';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { loadMTLModel } from '@/lib/model'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

function easeOutCirc(x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const Animation = () => {
  const refContainer = useRef<any>()
  const [target] = useState(new Vector3(-0.5, 1.2, 0))
  const [renderer, setRenderer] = useState<WebGLRenderer>()
  const [_camera, setCamera] = useState<OrthographicCamera>()
  const [_controls, setControls] = useState<OrbitControls>()
  const [initialCameraPosition] = useState(new Vector3(
    20 * Math.sin(0.2 * Math.PI),
    10,
    20 * Math.cos(0.2 * Math.PI)
  ))
  const [scene] = useState(new Scene())

  useEffect(() => {
    const { current } = refContainer
    if (current && !renderer) {
      const scW = current.clientWidth
      const scH = current.clientHeight

      const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputEncoding = sRGBEncoding
      current.appendChild(renderer.domElement)
      setRenderer(renderer)

      const scale = scH * 0.005 + 4.8
      const camera = new OrthographicCamera(
        -scale,
        scale,
        scale,
        -scale,
        0.01,
        50000
      )
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)
      setCamera(camera)


      const ambientLight = new AmbientLight(0xcccccc, 1)
      scene.add(ambientLight)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.target = target
      setControls(controls)


      const mtlLoader = new MTLLoader();
      mtlLoader.load('/CyberpunkDeLorean.mtl', (mtl: any) => {
        mtl.preload()

        const objLoader: OBJLoader = new OBJLoader();
        objLoader.load('CyberpunkDeLorean.obj', (object) => {
          objLoader.setMaterials(mtl)
          scene.add(object)

          animate()
        },
          (xhr) => {
            console.log(xhr.loaded / xhr.total * 100 + '% loaded')
          },
          (error) => {
            console.log('Error' + error)
          })
      },
        (xhr) => {
          console.log(xhr.loaded / xhr.total * 100 + '% loaded')
        },
        (error) => {
          console.log('Error' + error)
        }
      )

      let req = null
      let frame = 0
      const animate = () => {
        req = requestAnimationFrame(animate)

        frame = frame <= 100 ? frame + 1 : frame

        if (frame <= 100) {
          const p = initialCameraPosition
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

          camera.position.y = 10
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          controls.update()
        }

        renderer.render(scene, camera)
      }
    }
  }, [])

  return (
    <div ref={refContainer} style={{ height: 300, width: 400, border: '1px solid #fff' }}></div>
  )
}

export default Animation