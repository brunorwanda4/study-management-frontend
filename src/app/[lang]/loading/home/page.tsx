import MyImage from '@/components/myComponents/myImage';
import MyLink from '@/components/myComponents/myLink';

const LoadingPage = () => {
  return (
    <div className=" px-4 flex min-h-screen pt-4 space-x-4">
      <div className=" w-1/2 space-y-4">
        <div className=" flex justify-end">
          <span className=" skeleton h-12 w-20 rounded-full" />
        </div>
        <div className=" grid place-content-center">
          <div className="  flex flex-col space-y-6 justify-center items-center">
            <MyImage className=" size-16" src="/logo.png" />
          </div>
        </div>
        <div className=" flex flex-col space-y-4">
          <div className=" mt-10 flex flex-col justify-center items-center space-y-1">
            <h1 className=" text-2xl">
              Welcome to
              <span className=" font-medium font-mono leading-1">space-together</span>
            </h1>
            <p className="">Study smarter, collaborate better, manage easier — start now!</p>
          </div>
          <div className=" w-full skeleton h-40" />
          <div className=" text-center">
            <p>
              By continuing you agree to <span>space together</span>{' '}
              <MyLink href="/">Terms and Conditions</MyLink>
            </p>
          </div>
        </div>
      </div>
      <div className=" md:w-1/2 h-screen bg-gradient-to-tr from-base-100 to-base-300 rounded-3xl p-4 px-6 space-y-4">
        <div className=" flex  flex-col space-y-2">
          <span className=" skeleton w-full h-10" />
          <span className=" skeleton w-2/3 h-10" />
          <span className=" skeleton w-1/2 h-10" />
        </div>
        <div className=" skeleton h-2/3 w-full" />
      </div>
    </div>
  );
};

export default LoadingPage;
