import CollectionInDBMain from "./collection-in-DB-main"
import CollectionInPasentage from "./collection-in-pasentage"

const CollectionInDatabase = () => {
  return (
    <div className=" w-full">
      <div className=" flex w-full gap-4">
        <CollectionInPasentage/>
        <CollectionInDBMain />
      </div>
    </div>
  )
}

export default CollectionInDatabase
