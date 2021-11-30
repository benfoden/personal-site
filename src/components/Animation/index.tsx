import { useEffect, useState, useCallback, useRef } from 'react';
import styles from './Animation.module.scss'
import { Scene, Vector3, WebGLRenderer, sRGBEncoding, OrthographicCamera, AmbientLight, PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '@/lib/model'

function easeOutCirc(x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const Animation = () => {
  const refContainer = useRef<any>()
  const [target] = useState(new Vector3(0.1, 0.1, 0))
  const [renderer, setRenderer] = useState<WebGLRenderer>()
  const [_camera, setCamera] = useState<PerspectiveCamera>()
  const [_controls, setControls] = useState<OrbitControls>()
  const [initialCameraPosition] = useState(new Vector3(
    20 * Math.sin(0.1 * Math.PI),
    10,
    5 * Math.cos(0.1 * Math.PI)
  ))
  const [scene] = useState(new Scene())

  const handleWindowResize = useCallback(() => {
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      renderer.setSize(scW, scH)
    }
  }, [renderer])

  useEffect(() => {
    const { current } = refContainer
    if (current && !renderer) {
      const scH = current.clientHeight
      const scW = current.clientWidth
      const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scH, scW)
      renderer.outputEncoding = sRGBEncoding
      current.appendChild(renderer.domElement)
      setRenderer(renderer)

      const camera = new PerspectiveCamera(45, scW / scH, 1, 1000);
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)
      setCamera(camera)

      const ambientLight = new AmbientLight(0xcccccc, 5)
      scene.add(ambientLight)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.target = target
      setControls(controls)

      loadGLTFModel(scene, '/neptune.glb', {
        receiveShadow: false,
        castShadow: false
      }).then(() => {
        animate()
      })


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

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [renderer, handleWindowResize])

  return (
    <div className={styles.container}>
      <div ref={refContainer} className={styles.model}></div>
      <h1>Always keep it simple.</h1>
    </div>
  )
}

export default Animation