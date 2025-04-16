import MyImage from "@/components/myComponents/myImage"
import MyLink from "@/components/myComponents/myLink"

const AuthProvider = () => {
  return (
    <div className=" flex flex-col space-y-2">
      <MyLink className=" justify-start space-x-2 flex" type="button" href="/" button={{library : "daisy", size : "lg", variant:"default"}}>
        <MyImage
          src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
          role="ICON"
          className=" size-6"
        />
        Continuing with Google
      </MyLink>
      <MyLink className=" justify-start space-x-2 flex"type="button" href="/" button={{library : "daisy", size : "lg", variant:"default"}}>
        <MyImage
          src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
          role="ICON"
          className=" size-6"
        />
        Continuing with facebook
      </MyLink>
      <MyLink className=" justify-start space-x-2 flex" type="button" href="/" button={{library : "daisy", size : "lg", variant:"default"}}>
        <MyImage
          src="https://cdn-icons-png.flaticon.com/512/1051/1051326.png"
          role="ICON"
          className=" size-6"
        />
        Continuing with Github
      </MyLink>
    </div>
  )
}

export default AuthProvider
