import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

export function loadMTLModel(
  scene: any,
  glbPath: any,
  options = { receiveShadow: true, castShadow: true }
) {
  const { receiveShadow, castShadow } = options
  return new Promise((resolve, reject) => {
    const loader = new MTLLoader()
    loader.load(
      glbPath,
      (mtl: any) => {
        mtl.preload()
        // const obj = mtl.scene
        // obj.name = 'car'
        // obj.position.y = 0
        // obj.position.x = 0
        // obj.receiveShadow = receiveShadow
        // obj.castShadow = castShadow
        // scene.add(obj)

        // obj.traverse(function (child: any) {
        //   if (child.isMesh) {
        //     child.castShadow = castShadow
        //     child.receiveShadow = receiveShadow
        //   }
        // })
        // resolve(obj)
      },
      undefined,
      function (error: any) {
        reject(error)
      }
    )
  })
}