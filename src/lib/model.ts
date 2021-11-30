import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Box3, Vector3 } from 'three'
import { Scene } from 'three'

export function loadGLTFModel(scene: Scene, glbPath: string, options = { receiveShadow: true, castShadow: true }) {
  const { receiveShadow, castShadow } = options
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()

    loader.load(
      glbPath,
      (gltf) => {
        const obj = gltf.scene

        const box = new Box3().setFromObject(obj)
        const center = box.getCenter(new Vector3())

        obj.name = 'neptune'
        obj.position.x += obj.position.x - center.x
        obj.position.y += obj.position.y - center.y
        obj.position.z += obj.position.z - center.z
        obj.receiveShadow = receiveShadow
        obj.castShadow = castShadow
        scene.add(obj)

        obj.traverse(function (child: any) {
          if (child.isMesh) {
            child.castShadow = castShadow
            child.receiveShadow = receiveShadow
          }
        })
        resolve(obj)
      },
      undefined,
      function (error) {
        reject(error)
      },
    )
  })
}
